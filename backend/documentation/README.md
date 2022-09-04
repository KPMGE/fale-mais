## Setting up the environment

In order to set the *backend* up, all you need to do is creating a new 
*.env* file at the root of the *backend* directory, then copy the following 
configurations: 

```bash
POSTGRES_USER="postgres"
POSTGRES_HOST="db"
POSTGRES_DATABASE="fale_mais"
POSTGRES_PASSWORD="root"
POSTGRES_PORT=5432
```
You can change them later according to your needs!


## Loading csv files
For this project, there is a way of loading csv files into the postgres database, so that, you can set some default plans. You can do that, pretty easily, just change the files *prices.csv* and *plans.csv* on the *assets* directory. As long as you follow the structure there, everything will work.

## Generating api route docs

If you want to know all routes available in this application, it really simple,
first of all, make sure you have got *nodejs* and *npm* properly installed on your 
machine, then run the following command: 

```bash
npx insomnia-documenter --config ./api.json
```

Then, you can run a server with your brand new doc by using:
```bash
npx serve
```

Now it's as simple as opening a new tab on your favourite browser and accessing the link:
> http://localhost:3000
