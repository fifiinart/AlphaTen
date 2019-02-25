from flask import Flask, render_template
from threading import Thread

# Open the web app
app = Flask("Alpha Ten")

@app.route("/")
def home():
  return render_template("alpha-ten.html")

def run():
  app.run(host = "0.0.0.0", port = 5000)

def keep_alive():
  thread = Thread(target = run)
  thread.start()
