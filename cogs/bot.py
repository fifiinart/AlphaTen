import discord
from discord.ext.commands import Cog, command, CheckFailure, check

from cogs.predicates import is_person

# A Cog should just be a class that will hold all your functions
# for each command in
class Misc(Cog, name = "Misc"):  # The cog name can go along with the class extension

  # We need this constructor to load the cog into the bot in the main.py file
  def __init__(self, bot):
    self.bot = bot

  # # # # # # # # # # # # # # # # # # # # # # # # #
  # Commands
  # # # # # # # # # # # # # # # # # # # # # # # # #

  # When registering commands, we use the "command" decorator to give the command
  # its attributes such as name, aliases, description, and which cog it belongs to
  #   another note: the ctx parameter is required because this is what passes
  #   the context (guild, channel, author, etc.)
  @command(
    name = "say",
    aliases = ["echo"],
    description = "Echoes what you tell it to.",
    cog_name = "Misc"
    # pass_context = True <-- you might see some bots use this but for rewrite, you do not
    #     need this. context is automatically passed through
  )
  async def say(self, ctx, *, phrase = None):
    if phrase == None:
      await ctx.send(
        "<@{}> wanted to say something but there was nothing to say...".format(ctx.author.id)
      )

    else:
      await ctx.send(
        "<@{}> said: ".format(ctx.author.id) + phrase
      )

  @command(
    name = "kill",
    aliases = ["stop", "quit"],
    description = "Kills the bot and logs it out.",
    cog_name = "Misc"
  )
  # @check() # this check decorator will validate whoever tries to run the command
           #    for example, lets say you only want it to run in a guild:
  # @guild_only()  # this is built-in to the library which is why it is not surrounded in
                 # the @check() decorator
  @check(is_person(521817052470575105))
  async def kill(self, ctx):
    await ctx.send('Shutting down and logging out.')
    await self.bot.change_presence(
      status = discord.Status.offline,
    )
    await self.bot.logout()

  @command(
    name = "ping",
    description = "Pings the bot.",
    cog_name = "Misc"
  )
  async def ping(self, ctx):
    msg = await ctx.send(
      ":smile: Ping!"
    )
    await msg.edit(
      content = ":smile: Pong! `{}ms`".format(
        # int((end - start).total_seconds() * 1000)
        int(self.bot.latency * 1000)
      )
    )
  @command(
    name = "help",
    description = "Gives a help page.",
    cog_name = "Misc"
  )

  async def help(self, ctx):
    embed = discord.Embed(
      title = "Help",
      description = "The Help Page",
      color = 0x72d4ed
    ).add_field(name = "Misc", value = "**help**: Gives a help page.\n**ping**: Pings the bot.\n**kill**: Kills the bot and logs it out.\n**say**: Echoes what you tell it to.").set_author(name = str(ctx.message.author), icon_url = ctx.author.avatar_url)
    await ctx.send(embed = embed)


  # # # # # # # # # # # # # # # # # # # # # # # # #
  # Command Check Errors
  # # # # # # # # # # # # # # # # # # # # # # # # #

  @kill.error  # An error for a command should just be as simple as @{command function}.error
               # You can stack these as well so you run one function for multiple commands
  async def is_person_error(self, ctx, error):

    # We only want to check the error if the command checks failed (CheckFailure)
    if isinstance(error, CheckFailure):

      # And then the way you handle errors is up to you
      # For this example, we will use a rich embed
      embed = discord.Embed(
        title = "Error",   # This is obviously the title. Most attributes are self-documenting.
        description = "Something failed.",
        color = 0xEE0000   # color also has an alias (colour),
        # timestamp = , # This timestamp parameter is a datetime object (datetime.datetime)
        # url = , # The url of the embed will appear as a link wherever the title is
                  # so if you clicked on the title (in this case "Error"), you will be brought to this url
      ).add_field(
        name = "Field Name",    # This is the text that goes above each field in the rich embed
        value = "Field Value",  # This is the value of the field
        inline = False          # Whether or not to render the embed fields inline or not
      ).set_footer(
        text = "Some text."     # The text in this will appear at the very bottom of the embed in a smaller font
      ).set_author(
        name = "Fifi Art",     # Name of the author
        # icon_url = , # You don't necessarily need this, but it can be useful
                       # If you wanted to get the pfp of the command author, you would do
                       # this: ctx.author.avatar_url
        # url = , # This url functions similar to the url of the actual embed but if you click the author's name
                  # you will be brought to this url
      )

      # NOTE: Any of the extra functions (add_field, set_footer, set_author) can also be run like this
      embed.add_field(
        name = "Field Name",
        value = "Field Value",
        inline = False
      )

      # The functions return the embed object for easy function stacking like above
      # For more information on rich embeds, here's the documentation for it
      # https://discordpy.readthedocs.io/en/rewrite/api.html#embed

# For each cog, this function is required to load the cog into
# the bot. if you don't have this, the cog will not be loaded
def setup(bot):
  bot.add_cog(Misc(bot))
