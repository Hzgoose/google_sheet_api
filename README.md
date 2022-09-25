## google sheet sync
mini repo to sync data to google sheet

## env file 
```
APPLICATION_PORT= <port>
LOGFILE=logs/systems.log
DEBUG=true

GOOGLE_SHEET_FILE= <id of spreadsheets>
GOOGLE_SHEET_TEMPLATE= <title sheet template>
```

## Run
```
cp env.dist .env
addd creds file <contact nghiepTD>
pm2 run
```

## api document 
```
create new order
curl --location --request POST 'http://localhost:3001/api/v1.0/google' \
--header 'Content-Type: application/json' \
--data-raw '{
    "orderID": "1234",
    "district": "binh thanh",
    "phone": "0987654321",
    "customer": "abc",
    "address": "12 abc quan 12 hcm",
    "note_to_shop": "all isConfirmByCall",
    "note_to_customer": "all in",
    "isConfirmByCall": true,
    "kgRequest": 12,
    "kgActually": 12.3,
    "price": 90000,
    "totalPrice": 90000,
    "shipFee": 9000,
    "total": 1000000,
    "discount": 0
}'
```

```
update order by id
curl --location --request PUT 'http://localhost:3001/api/v1.0/google' \
--header 'Content-Type: application/json' \
--data-raw '{
    "orderID": "1234",
    "district": "binh thanh",
    "phone": "0987654321",
    "customer": "abc",
    "address": "12 abc quan 12 hcm",
    "note_to_shop": "all isConfirmByCall",
    "note_to_customer": "all in",
    "isConfirmByCall": true,
    "kgRequest": 12,
    "kgActually": 12.3,
    "price": 90000,
    "totalPrice": 90000,
    "shipFee": 9000,
    "total": 1000000,
    "discount": 0
}'
```

## auth
- Call by server to server
- we don't support auth yet =]]]] 