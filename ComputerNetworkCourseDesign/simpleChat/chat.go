package main
//导入包
import (
	"bufio"
	"flag"
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"strconv"
	"strings"
)
//用下划线代替不需要接收的输出值
var _ = fmt.Println
//Package log implements a simple logging package. It defines a type, Logger, with methods for formatting output.
var Log *log.Logger
//客户的结构体
type Client struct {
	outgoing chan string  //准备发送的消息
	reader   *bufio.Reader
	writer   *bufio.Writer
	name     string
	ip       string
}
//dealBr函数 删除掉包括"\n"和后面的数据
func dealBr(s string) string {
	return strings.TrimRight(s, "\n")
}
//读方法
func (client *Client) Read() {
	for {
		line, err := client.reader.ReadString('\n')
		if err != nil {
			if err == io.EOF {
				return
			}
			Log.Println(err)
			delete(onlineClients, client.name)
			brodCast(fmt.Sprintf("user %s leave\n", client.name))
			return
		}
		if len(line) > 2 && line[0] == '/' {
			msg := line[1:]
			sp := strings.SplitN(msg, " ", 2)
		//	Log.Println(sp)
			if len(sp) == 2 {
				name := sp[0]
				msg := sp[1]
				msg = fmt.Sprintf("msg from %s to %s : %s\n", client.name, name, msg)
				Log.Println(msg)
				to, ok := onlineClients[name]
				if ok {
					to.outgoing <- msg
				} else {
					msg := "no such user online"
					Log.Println(msg)
					client.outgoing <- msg
				}
			}
		} else {
			msg := fmt.Sprintf("%s: %s\n", client.name, line)
			Log.Println(dealBr(msg))
			brodCast(msg)
		}
	}
}
//写方法
func (client *Client) Write() {
	for data := range client.outgoing {
		client.writer.WriteString(dealBr(data) + "\n")
		client.writer.Flush()
	}
}
//监听方法
func (client *Client) Listen() {
	go client.Read()
	go client.Write()
}
//广播方法
func brodCast(msg string) {
	Log.Println("brodCast", dealBr(msg))
	for _, v := range onlineClients {
		v.outgoing <- dealBr(msg) + "\n"
	}
}
//创建新用户方法
func NewClient(connection net.Conn) *Client {
	//返回一个新的有默认尺寸缓存的writer
	writer := bufio.NewWriter(connection)
	//返回一个新的有默认尺寸大小的Reader
	reader := bufio.NewReader(connection)
	writer.WriteString("Input you name:")
	//确保所有数据已转为基本的io.Writer
	writer.Flush()
	name, _ := reader.ReadString('\n')
	name = strings.Replace(name, "\n", "", -1)
	client := &Client{
		outgoing: make(chan string),//待发消息
		reader:   reader,
		writer:   writer,
		ip:       connection.RemoteAddr().String(),
		name:     name,
	}
	msg := fmt.Sprintf(
		`You name:%s
You ip:%s
type "/name msg" to chat
type "msg" to broadcast
Online user %d:
`,
		name, client.ip, len(onlineClients))
	for _, v := range onlineClients {
		line := fmt.Sprintf("  name: %s , ip: %s\n", v.name, v.ip)
		msg += line
	}
	writer.WriteString(msg)
	writer.Flush()
	msg = fmt.Sprintf("New user %s %s\n", name, client.ip)
	Log.Println(dealBr(msg))
	brodCast(msg)
	client.Listen()
	return client
}
//存储在线用户 map
var onlineClients map[string](*Client)
//flag 命令行标签解析
//flag.Int(name,value,usage)  定义一个有制定名字，默认值和用法说明的int标签，返回一个存储标签解析值的int变量地址
var port = flag.Int("port", 6666, "port=6666 ")
//主函数
func main() {
	onlineClients = make(map[string](*Client), 0)
	//监听listen  类型：tcp  格式：ip加端口   strconv.Itoa函数 将数字转换为字符串
	listener, err := net.Listen("tcp", "0.0.0.0:"+strconv.Itoa(*port))
	if err != nil {
		Log.Fatalln(err)
	}
	log.Println("simpleChat run on ", "0.0.0.0:"+strconv.Itoa(*port))
	log.Println("please type \"nc serverip youport\" to connect it")
	log.Println("for example: nc localhost 6666")
	for {
		//一直等待下一个用户的接入
		conn, _ := listener.Accept()
		c := NewClient(conn)
		onlineClients[c.name] = c
	}
}
//初始化函数
func init() {
	//新建一个新的记录器
	//原型：func New(out io.Writer, prefix string, flag int) *Logger      out为写入数据的目的地   prefix为每一行都以它开始   int为属性
	Log = log.New(os.Stdin,
		"TRACE: ",
		log.Ldate|log.Ltime|log.Lshortfile)
	//解析命令行参数并传入定义行的标签
	flag.Parse()
}
