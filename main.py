import discord
import app 
import os
from discord.ext.commands import AutoShardedBot

# Open Bot Client
bot = AutoShardedBot(command_prefix = "alpha ", case_insensitive = True)
bot.remove_command("help")

# Keep track of extensions
exts = [
  "cogs.bot"
]

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# Basic Events
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

@bot.event
async def on_ready():
  # Set presence
  await bot.change_presence(
    status = discord.Status.online,
    activity = discord.Activity(
      name = "alpha help in {} servers".format(
        len(bot.guilds)
      ),
      type = 2 # listening activity
    )
  )

@bot.event
async def on_command(ctx):
  async with ctx.typing():
    pass

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# Run The Bot
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

if __name__ == "__main__":

  for ext in exts:
    try:
      bot.load_extension(ext)
    except Exception as error:
      print("{} cannot be loaded.\n - {}".format(ext, error))
      
  app.keep_alive()
  bot.run(os.environ["BOT_TOKEN"])
