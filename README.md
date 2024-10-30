# COCK API
<section id="introduction">

API for managing cocktails and it's ingredients collections. Made with TypeScript and MongoDB.
</section>
<section id="base-url">

## Base url
### For Cocktails collection:
<code>http://\${API_URL}:\${PORT}/cocktails</code>
### For ingredients collection:
<code>http://\${API_URL}:\${PORT}/ingredients</code>

<u>By default port is set to 3000.</u>

</section>

<section id="endpoints-preview"

## Endpoints preview

### Cocktails

<table>
    <tr>
        <td>Method</td>
        <td>Endpoint</td>
        <td>Description</td>
    </tr>
    <tr>
        <td><b>GET</b></td>
        <td>/cocktails/get/</td>
        <td>Retrives cocktail with passed ID.</td>
    </tr>
    <tr>
        <td><b>GET</b></td>
        <td>/cocktails/getAll/</td>
        <td>Retrives all cocktails.</td>
    </tr>
    <tr>
        <td><b>POST</b></td>
        <td>/cocktails/add/</td>
        <td>Adds cocktail to collection, requires body.</td>
    </tr>
    <tr>
        <td><b>PUT</b></td>
        <td>/cocktails/update/</td>
        <td>Updates existing cocktail, requires Body and ID param.</td>
    </tr>
    <tr>
        <td><b>DELETE</b></td>
        <td>/cocktails/delete/</td>
        <td>Deletes existing cocktail, require ID param.</td>
    </tr>

</table>

### Ingredients

<table>
    <tr>
        <td>Method</td>
        <td>Endpoint</td>
        <td>Description</td>
    </tr>
    <tr>
        <td><b>GET</b></td>
        <td>/ingredients/get/</td>
        <td>Retrives ingredient with passed ID.</td>
    </tr>
    <tr>
        <td><b>GET</b></td>
        <td>/cocktails/getAll/</td>
        <td>Retrives all ingredients.</td>
    </tr>
    <tr>
        <td><b>POST</b></td>
        <td>/cocktails/add/</td>
        <td>Adds ingredient to collection, requires body.</td>
    </tr>
    <tr>
        <td><b>PUT</b></td>
        <td>/cocktails/update/</td>
        <td>Updates existing ingredient, requires Body and ID param.</td>
    </tr>
    <tr>
        <td><b>DELETE</b></td>
        <td>/cocktails/delete/</td>
        <td>Deletes existing ingredient, require ID param.</td>
    </tr>
</table>

</section>

## Endpoints

### Cocktails

### GET

<i> GET methods does not require Body.</i>

<code>/get/<:id></code>

The endpoint retrieves details of a specific cocktail identified by the provided ID.
The response returned is a JSON object with the following schema:

<ul>
    <li>Response code: 200</li>
    <li>Content-type: application/json</li>
</ul>

```
{
    "id" : int,
    "name" : String,
    "category" : String,
    "instructions" : String,
    "ingredients" : 
    [
        {
        "ingredient_id" : int,
        "name" : String,
        "quantity" : String
        }
    ]
}
```

<code>/getAll/</code>

This endpoint retrieves array of all cocktails.
The response returned is a array of JSON object with the schema same as in <code>/get/<:id></code>.



### POST

<code>/add/</code>

This endpoint adds cocktail to the collection using POST method, returns created object. 

#### Example body:
```
{
    "name": "Specjal z colą",
    "category": "Pifko",
    "instruction": "Proporcje 99:1",
    "ingredients": [
        {
            "ingredient_id": "671a34a26e675940db32e59e", 
            "quantity": "1.5 ml"
        }
    ]
}
```

<u>Ingredient's IDs are validated before running a POST request. If ingredient with passed ID does not exist - cocktail will not be created!</u>

#### Example of invalid ingredient ID response

<code>Ingredient id ${invalid_id} is invalid.</code> Status code (404).

<u>All fields of cocktail model are required in Body Json, to successfully execute POST request!</u>

#### Example of incomplete body response 

<code>Bad request.</code> Status code (400).

#### Example of valid respnse

<ul>
    <li>Response code: 200</li>
    <li>Content-type: application/json</li>
</ul>

``` 
{
    "id": "672226e6eff4fd73f136eeb9",
    "name": "Margarita",
    "category": "Piwo",
    "instructions": "Shake all ingredients with ice and strain into a chilled glass.",
    "ingredients": 
    [
        {
            "ingredient_id" : some ingredient id as int,
            "quantity" : "2 slices"
        
        }    
    ]
}
```

### PUT

<code>/put/<:id></code>

This endpoint updates existing cocktail object in collection. Requires valid ID param and field you want to update in Body (Json format).

<u>Update, also validates ingredients ID before executing PUT request!</u>

#### Example of proper request

#### Endpoint

<code>`http://localhost:3000/cocktails/update/671a349d6e675940db32e596`</code>

#### Body

```
{
    "name" : "updated_name"
}
```

#### Response

Responses for valid/invalid requests are same as in <code>/add/</code> endpoint.

### DELETE

<code>/delete/<:id></code>

This endpoint removes existing cocktail with ID. Requires valid ID param.

#### Example of proper request

<code>`http://localhost:3000/cocktails/delete/671a349c6e675940db32e592`</code>

#### Example of valid response

<ul>
    <li>Response code: 200</li>
    <li>Content-type: text/html</li>
</ul>

<code>Resource deleted succesfully.</code>

#### Example of invalid ID response
<code>Cocktail with ID 671a349c6e675940db32e592 was not found.</code>

### Ingredients

### GET

<i> GET methods does not require Body.</i>

<code>/get/<:id></code>

The endpoint retrieves details of a specific ingredient identified by the provided ID.
The response returned is a JSON object with the following schema:

<ul>
    <li>Response code: 200</li>
    <li>Content-type: application/json</li>
</ul>

```
{
    "id" : int,
    "name" : String,
    "description" : String,
    "is_alcohol" : String,
    "image_url" : String
}
```

<code>/getAll/</code>

This endpoint retrieves array of all ingredients.
The response returned is a array of JSON object with the schema same as in <code>/get/<:id></code>.



### POST

<code>/add/</code>

This endpoint adds ingredient to the collection using POST method, returns created object. 

#### Example body:
```
{
    "name": "cola",
    "descrption": "sweet",
    "is_alcohol": false,
    "image_url" : "https://example.com/photo_of_ingredient.jpg"
}
```

<u>All fields of ingredient model are required in Body Json, to successfully execute POST request!</u>

#### Example of incomplete body response 

<code>Bad request.</code> Status code (400).

#### Example of valid respnse

<ul>
    <li>Response code: 200</li>
    <li>Content-type: application/json</li>
</ul>

``` 
{
    "id": "672226e6eff4fd73f136eeb9",
    "name": "cola",
    "description": "sweet",
    "is_alcohol" : false,
    "image_url" : "https://example.com/photo_of_ingredient.jpg"
}
```

### PUT

<code>/put/<:id></code>

This endpoint updates existing ingredient object in collection. Requires valid ID param and field you want to update in Body (Json format).


#### Example of proper request

#### Endpoint

<code>`http://localhost:3000/ingredients/update/671a349d6e675940db32e596`</code>

#### Body

```
{
    "name" : "updated_name"
}
```

#### Response

Responses for valid/invalid requests are same as in <code>/add/</code> endpoint.

### DELETE

<code>/delete/<:id></code>

This endpoint removes existing ingredient with ID. Requires valid ID param.

#### Example of proper request

<code>`http://localhost:3000/ingredients/delete/671a349c6e675940db32e592`</code>

#### Example of valid response

<ul>
    <li>Response code: 200</li>
    <li>Content-type: text/html</li>
</ul>

<code>Resource deleted succesfully.</code>

#### Example of invalid ID response
<code>Ingredient with ID 671a349c6e675940db32e592 was not found.</code>

