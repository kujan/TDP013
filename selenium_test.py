from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from time import *



def register(username, password):
	registerButton = driver.find_element_by_id("register")
	registerButton.click()

	usernameInput = driver.find_element_by_id("username")
	passwordInput = driver.find_element_by_id("password")
	passwordConfInput = driver.find_element_by_id("passwordconf")
	submitButton = driver.find_element_by_id("button")
	usernameInput.clear()
	passwordInput.clear()
	passwordConfInput.clear()

	usernameInput.send_keys(username)
	passwordInput.send_keys(password)
	passwordConfInput.send_keys(password)

	submitButton.click()

def login(username, password):
	userForm = driver.find_element_by_id("username")
	passForm = driver.find_element_by_id("password")
	loginButton = driver.find_element_by_id("login")

	userForm.clear()
	passForm.clear()

	userForm.send_keys(username)
	passForm.send_keys(password)
	loginButton.click()

def post(msg):
	msgForm = driver.find_element_by_id("msgQuery")

	msgForm.send_keys(msg)
	submitButton = driver.find_element_by_id("msgSubmit")

	submitButton.click()
	msgForm.clear()

def search(user):
	searchForm = driver.find_element_by_id("searchQuery")
	searchForm.clear()

	searchForm.send_keys(user)
	submitButton = driver.find_element_by_id("searchSubmit")
	submitButton.click()
	sleep(1)
	userLink = driver.find_element_by_id(user)
	userLink.click()

def add_friend():
	addButton = driver.find_element_by_id("addFriend")
	addButton.click()

def logout():
	logOut = driver.find_element_by_id("logOut")
	logOut.click()

driver = webdriver.Firefox()
driver.get("http://127.0.0.1:8888")

username = "selenium"
password = "Memntn12"
username2 = "test"
password2 = "asdf123"
username3 = "selenium2"
password3 = "asdfwqerty"
register(username, password)
register(username2, password2)
register(username3, password3)
login(username, password)
post("test test")
post("asdasd test hej hej hej!!!!")
search(username2)
add_friend()
post("Hej hej " + username2)
logout()
login(username2,password2)
post("wohoo!")
