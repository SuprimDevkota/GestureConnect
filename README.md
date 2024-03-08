# GestureConnect
## Requirements
- [Node.js](https://nodejs.org/en/)
- [Python 3.6 or above](https://www.python.org/downloads/)

## Usage
1. Clone the repository
```
git clone git@github.com:SuprimDevkota/GestureConnect.git
```

2. Navigate to the repository :open_file_folder:
```
cd GestureConnect
```

3. Install the frontend dependencies
```
cd client
npm install
```

4. Create a virtual environment and activate it
```
cd ../backend
python3 -m venv venv
source venv/bin/activate
```

5. Create a `.env` file inside the `backend` folder with the following:
```
MODE="development"
SECRET_KEY="yourverysecurekey"
```

6. Create a `.env` file inside the `client` folder with the following:
```
DEV=True
MODE="development"
```

7. Install the backend dependencies
```
python3 -m pip install -r requirements.txt
```

8. Migrate the Django migrations and start the backend development server
```
python3 manage.py migrate
python3 manage.py runserver
```

9. Open a new terminal from `client` folder and run the frontend development server
```
npm run dev
```
