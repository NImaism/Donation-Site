package Controllers

import (
	"DonationPanel/Utility"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func Base(e *gin.Context) {
	e.HTML(http.StatusOK, "Home.html", gin.H{})
}

func Pay(e *gin.Context) {
	idpayC := Utility.NewClient("Idpay Api Key", false)
	price, err := strconv.Atoi(e.PostForm("price"))
	if err != nil {
		e.HTML(http.StatusFound, "Error.html", gin.H{})
		return
	}
	username := "Start Payment"
	content := ">>> ||<@841250866895781918>|| \n **Start Payment** :moneybag:   \n `Name : ` **" + e.PostForm("name") + "** \n `Amount :` **" + e.PostForm("price") + "** \n `Nesbat :` **" + e.PostForm("nesbat") + "** \n `Nasihat :` **" + e.PostForm("nasihat") + "** \n `Tozihat` **" + e.PostForm("description") + "**"
	url := "Your Discord Webhook Url"
	message := Utility.Message{
		Username: &username,
		Content:  &content,
	}
	if err := Utility.SendMessage(url, message); err != nil {
		fmt.Println(err)
	}
	createRes := idpayC.CreatePayment("15", int64(price)*10, "https://nimaism.ir/Resid", e.PostForm("name"), "", "nimasa036@gmail.com", e.PostForm("description"))
	e.Redirect(http.StatusFound, createRes.Link)
}

func CallBack(e *gin.Context) {
	idpayC := Utility.NewClient("Idpay Api Key", false)
	if e.PostForm("status") != "10" {
		e.HTML(http.StatusFound, "Error.html", gin.H{})
		return
	}
	idpayC.Verify(e.PostForm("id"), e.PostForm("order_id"))

	username := "Verify Payment"
	content := ">>> ||<@841250866895781918>|| \n **Payment Has Verify** :money_mouth:   \n `Amount : ` **" + e.PostForm("amount") + "** "
	url := "Your Discord Webhook Url"
	message := Utility.Message{
		Username: &username,
		Content:  &content,
	}
	if err := Utility.SendMessage(url, message); err != nil {
		fmt.Println(err)
	}
	e.HTML(http.StatusFound, "Success.html", gin.H{})
}
