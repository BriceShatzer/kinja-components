# Login ![ready](status-images/ready.svg) ![new](status-images/new.svg)

This component incorporates the OAuth and Burner login flows as well as registration steps.
The different screens are:
- OAuth login: log in with any oauth provider. Logging in with a burner account is hidden behind a link.
- Burner login: Log in with a burner account. Can go back to OAuth, and there is a link for new Burner creation.
- Burner registration: create a new burner account. Can go back to burner login.
- Received password: After a burner registration completes, shows you the password sent by the server
- Set screen name: after you connect for the first time with an OAuth provider, shows you a screen where you need to set your sreen name

The component is fairly dumb and mostly just handles switching between the different steps. Most of the user logic is in a controller that renders this component, passing in error states as necessary.

[Storybook demo](http://localhost:8001/?selectedKind=Login)

<!-- STORY -->