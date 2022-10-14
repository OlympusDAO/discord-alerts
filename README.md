# discord-alerts

Provides alerts in Discord when bonds behave abnormally.

The scope will be expanded in the future to support different metrics.

## Architecture

- A simple function is deployed on Cloudflare Workers to fetch bond snapshots and check that they are within set bounds. If out of bounds, a Discord message is sent.
- UptimeRobot calls the function periodically (every minute, at the moment).

### Why Cloudflare?

- Pure Javascript/Typescript
- Simple APIs and environment

### External Trigger

Initially, the inbuilt Cloudflare Workers cron trigger was used. However, it required some sacrifices:

- No response and hence no status code, which means we can't monitor errors
- Scheduled workers behave differently and aren't documented well

Using an external trigger (UptimeRobot) gives the best outcome.

## Deployment

The `wrangler.toml` file defines two deployments in Cloudflare Workers:

- Default deployment, used for development and named `discord-alerts`
- Production deployment, named `discord-alerts-production`

There is a separate key-value store binding for each, and secrets are also separate.

To deploy, run: `yarn deploy`

## Secrets

- The following secrets are required in order to run:
    - WEBHOOK_URL - a Discord webhook URL
- Set this using the following command: `echo <URL> | yarn wrangler secret put WEBHOOK_URL`
    - To set the variable in production, append: ` --env production`

## Development Environment

- Copy the `.dev.vars.sample` file to `.dev.vars` and fill in the variable(s).
- Run `yarn start` to run the worker function locally
- Run `yarn trigger` in a new terminal to trigger accessing the worker function, and watch the output in the terminal that `yarn start` was run in.