package main

import "log"
//主函数
func main() {
	s := &Server{}
	host := "0.0.0.0:8777"
	log.Println("my-socks5-proxy run ", host)
	//监听端口
	s.ListenAndServe("tcp", host)
}
