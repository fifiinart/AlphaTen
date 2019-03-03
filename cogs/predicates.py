from discord.ext.commands import check

developers = [521817052470575105]

# Checks should always be async
# For example, let's add the is_person check
#   which is a combination of async and regular functions
def is_person(author_id):  # The author_id should be a number in the rewrite branch of discord.py
                           # In async, a user's id is given as a string.
                           # Just added that in here in case you see other code that has ID's as strings

  # This predicate function is what actually checks whether or not a user
  # can run the command
  async def predicate(ctx):
    return ctx.author.id == author_id

  # This returns the check of the predicate which is used in the discord.py
  # library to check the command and if it can be run
  return check(predicate)

# You can also do custom checks asynchronously
# For example, I will add in a check to see if
# a command author is a developer
async def is_developer(ctx):
  return ctx.author.id in developers
