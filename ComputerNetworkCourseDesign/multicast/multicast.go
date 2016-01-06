package main

import (
	"flag"
	"fmt"
	"log"
	"net"
	"time"
)

var addrString = flag.String("addr", "224.0.0.1:9999", "multicast udp addr")
var maxDatagramSize = 8192

func init() {
	log.SetFlags(log.Lshortfile | log.Ltime)
	flag.Parse()
}

func main() {
	addr, err := net.ResolveUDPAddr("udp", *addrString)
	if err != nil {
		log.Fatalln(err)
	}
	go send(addr, "hi")
	go send(addr, "hello")
	server(addr)
}

func send(addr *net.UDPAddr, msg string) {
	conn, err := net.DialUDP("udp", nil, addr)//连接到addr网络上
	if err != nil {
		log.Fatalln(err)
	}
	id := 0
	for {
		n, err := conn.Write([]byte(fmt.Sprintf("%s %d", msg, id)))
		if err != nil {
			log.Println("conn Write error", n, err)
		}
		id++
		time.Sleep(time.Second)
	}
}

func server(addr *net.UDPAddr) {
	linstener, err := net.ListenMulticastUDP("udp", nil, addr)
	if err != nil {
		log.Fatalln(err)
	}
	linstener.SetReadBuffer(maxDatagramSize)
	buf := make([]byte, maxDatagramSize)
	for {
		n, src, err := linstener.ReadFromUDP(buf)
		if err != nil {
			log.Println("ReadFromUDP error", n, src)
			continue
		}
		log.Println("recv:", src, string(buf[:n]))
	}
}
