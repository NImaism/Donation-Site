package Routing

import (
	"DonationPanel/Controllers"
	"github.com/gin-gonic/gin"
)

func SetRouting(e *gin.Engine) {
	e.GET("", Controllers.Base)
	e.POST("/Donate", Controllers.Pay)
	e.POST("/Resid", Controllers.CallBack)
}
