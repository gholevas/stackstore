Organization - in general, I really like the way this is organized by component. In a larger project, you would want to be sure to separate each Angular constructor (factories, controllers, config, etc) into different files so that you don't have people working on the same files so much. Like we discussed, there would be lots of opportunities to modularize the HTML markup into directives, as well :)

Security - Your secrets.json is in plain view! Make sure you remove it!
