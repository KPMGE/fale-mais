# FaleMais

This is a simple project called *FaleMais*. The goal is to make it easier for the users of a fake company, *Telzir*, to know the price they would pay with or without a plan from the company. So that, they can figure out if such a plan is worth for them. 

---

## Backend
The fist, and maybe the most important part of this system is the *backend*, it's role is saving the phone calls and phone plans and calculating the price with and without the plan.

Speaking about the *api*, it was made with *Typescript* and *NodeJs*. The database used is *PostgreSQL*. Such an *api* was made using great software principles, first of all, TDD(test driven development) was implied to make sure every part of the system would work as expected. 
Moreover, i have applied the concepts of clean architecture on it.

### How is the backend project structured?
Basically in this project, you have got 7 principal folders. The __tests__ folder is where i have been doing the 
tests. Naturally, as i am using TDD, i have been testing first!

The __src__ folder is where all the production code is. There you will find all the clean architecture layers plus
a main layer. The main layer is just the place where all the code is coupled. There is the place where you are going 
to find a connection to a database or an external frameworks for example. All the remaining layers are decoupled. 

Now i am going to explain briefly what each of the layers do. If you already know about the clean architecture, this is exactly what Robert C. Marting proposes. 

#### domain
The domain layer is where the core of our application is. You shall find the tiniest pieces of the application 
there, specifically in our case, the entities of the application: *PhonePlan* and *PhoneCall*

#### application
the application layer is where the implementation of the *useCases* are going to be found. Specifically i usually call them services. More than that, in this
layer, we do not care about how the system is dealing persistence. So we abstract away any type of database connection for example. In order to do that, we just depend on interfaces instead of concrete implementations. So, later we can replace the implementations with much less effort.

#### infrastructure
the infrastructure layer is where we actually implement the persistence system and connection with external providers. We do that following the 'rules' defined in the domain layer. Please note that by 'rules' i mean that we implement an interface defined in the domain model, so that later we can pass in that concrete implementation to the *services* and it shall know how to deal with the data the way we want.

#### presentation
the presentation layer is where we deal with how our *api* is going to serve its data. In our case, we are using http request/response. But it is important to notice that we are not depending on any framework on this layer. Instead, we create a representation of what is a http request and http response. So that, our application does not care how other frameworks deal with http, we just care about how *OUR* *api*  represents and deals with it. 

#### main
As i said before, the main layer is where we couple all the components together. The nicest thing in this case is that, as we have decoupled everything else, it's kind of easy to assemble all the components together. More than that, we can use some design patterns to do that, just like the factory design pattern and the adapter one for example. 

---

## Frontend
The *frontend* part of this project was very simple, as the only role of it was to provide the user with some options to choose the origin
and destination ddds, the phone plan and the duration of the call. For such a project, i have used a *javascript* framework called *NextJs*. This one is really similar to *ReactJs*, but with some additional features. Additionally, i have implied *Typescript* on this project too, because i do believe
it helps writing better and more understandable code.

So basically, i have made some simple *dropdown* menus for choosing the origin and destination ddds and the phone plan, plus a input for entering the duration of the call. Naturally, as i have all that data, i can make a request to the api and get back the price with and without the chosen plan.

--- 

## How to run the project
I know, all of that sounds cool, but how do i run it?

In order to run this whole project, first of all you are supposed to create a *.env* file at the *backend* folder to make some configurations, 
hopefully, that is very easy to do and i have explained it and more on the [backend documentation](https://github.com/KPMGE/fale-mais/tree/main/backend/documentation#readme). Go there and follow the first steps.

After that, you are pretty much good to go. I have *dockerized* this whole application so that it is a piece of cake to get it started. 
Make sure you have got docker properly installed on your machine, then run the simple command: 

```bash
sudo docker-compose up -d
```

After a little while, everything should be up and running. Finally, you can access the project by accessing the link: 

> http://localhost:3000
