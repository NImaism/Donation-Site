package main

import (
	"DonationPanel/Routing"
	"github.com/gin-gonic/gin"
	ratelimit "github.com/jonsen/gin-ratelimit"
	"log"
)

func main() {

	// INIT SERVER
	Server := gin.Default()

	// SET LIMIT
	Server.Use(ratelimit.RateLimit(5))

	// SET ROUTING
	Routing.SetRouting(Server)
	// LOAD FILE
	Server.LoadHTMLGlob("Templates/*.html")
	Server.Static("/Static", "./Static")
	if err := Server.Run(":8080"); err != nil {
		log.Fatalln(err)
	}
}
