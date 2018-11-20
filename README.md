# Node-Express-PostgreSQL-CRUD API
Small solution to showcase the basics of NodeJs, ExpressJs and PostgreSQL database operations.
This is a Rest Api solution using basic database create, read, update and delete operations (CRUD).
Also support for search, sort and pagination.

## Installation
- Clone the repo: git clone `https://github.com/AVantala/indx-test`
- Install dependencies: `npm install`
- Start the server: `npm start or node app.js`

## Database Schema

```
CREATE DATABASE database_name; (e.g. indx-dev)
```

```
-- Drop table

-- DROP TABLE public."user"

CREATE TABLE public."user" (
	user_id serial NOT NULL,
	first_name varchar(20) NOT NULL,
	last_name varchar(20) NOT NULL,
	username varchar(20) NOT NULL,
	CONSTRAINT user_pkey PRIMARY KEY (user_id),
	CONSTRAINT user_username_key UNIQUE (username)
);
```

```
-- Drop table

-- DROP TABLE public.organization

CREATE TABLE public.organization (
	organization_id serial NOT NULL,
	organization_name varchar(20) NOT NULL,
	CONSTRAINT organization_pkey PRIMARY KEY (organization_id)
);
```

```
-- Drop table

-- DROP TABLE public.user_organization_mapping

CREATE TABLE public.user_organization_mapping (
	user_organization_mapping_id serial NOT NULL,
	user_id int4 NULL,
	organization_id int4 NULL,
	user_organization_role varchar(20) NOT NULL,
	CONSTRAINT user_organization_mapping_pkey PRIMARY KEY (user_organization_mapping_id),
	CONSTRAINT user_organization_mapping_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE RESTRICT,
	CONSTRAINT user_organization_mapping_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(user_id) ON DELETE RESTRICT
);
```

## Configuration
Go to `config/db.json` and update database configuration.


## Testing the API
Test your API using [Postman](https://www.getpostman.com/collections/b2d0d5eb87cf77a24f1d)
