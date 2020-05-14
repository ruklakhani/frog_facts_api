# Frog Facts API
an api for frog facts
## Routes
POST: /api/signup/
- username: username
- password: password

to create an account

---
POST: /api/login/
- username: username
- password: password

to login

---
GET: /api/logout/

to logout

---
POST: /api/fact/
- fact: your frog fact

to add a frog fact

---
PUT: /api/fact/
- id: (the id of your frog fact)
- fact: your updated frog fact

updates a frog fact

---
DELETE: /api/fact/
- id: (the id of your frog fact)

deletes a frog fact

---
GET: /api/

for a list of every frog fact

---
GET: /api/myfacts

for a list of every frog fact you've created
# frog_facts_api
