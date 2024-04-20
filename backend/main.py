from flask import Flask, request, jsonify
from flask_cors import CORS
from constants_sql import Constants
import mysql.connector

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) # allows localhost to access the flask server

def createUser(username, password):
    msg = "User already exists."
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        validCheck = """
            SELECT person_id from users_login WHERE username = %s
        """

        cursor.execute(validCheck, (username,))
        valid = cursor.fetchall()

        if not valid:
            print("Valid")
            insertLogin = """
                INSERT INTO users_login(username, password) VALUES (%s, %s);
            """

            insertStats = """
                INSERT INTO users_stats(id) 
                SELECT person_id FROM users_login WHERE username = %s AND password = %s;
            """

            cursor.execute(insertLogin, (username, password))
            cursor.execute(insertStats, (username, password))
            msg = "Created account."
        else:
            print("User already exists.")


    except mysql.connector.Error as error:
        print("Error occured: ", error)

        
    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

    return msg

def checkUser(username, password):
    msg = "Incorrect username/password."
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        passCheck = """
            SELECT person_id FROM users_login WHERE username = %s AND password = %s
        """

        cursor.execute(passCheck, (username, password))
        valid = cursor.fetchall()

        if valid:
            print("Valid password")
            msg = "Login successful."
        else:
            print("Wrong password")


    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

    return msg

def connectToSql(height, weight):
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor()

        createTableSQL = """
            CREATE TABLE IF NOT EXISTS users_stats (
            person_id varchar(255) NOT NULL,
            height varchar(255) ,
            weight varchar(255),
            PRIMARY KEY(person_id)
            );
        """

        dropTableSQL = """
            DROP TABLE users
        """

        alterTableSQL = """
            ALTER TABLE users_stats MODIFY weight varchar(255) NULL;"""

        updateTableSQL = """
            UPDATE users_stats SET height = %s, weight = %s WHERE person_id = %s;
        """

        insertTableSQL = """
            INSERT INTO users_stats (person_id, height, weight) VALUES (%s, %s, %s);
        """

        #cursor.execute(insertTableSQL, (2, height, weight))
        cursor.execute(updateTableSQL, (height, weight, 2))
        
    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")


@app.route('/info-form', methods=['POST'])
def submit_form():
    data = request.json  # This will contain your form data
    # Do something with the data, for example:
    height = data.get('height')
    weight = data.get('weight')
    # Process the data, save to database, etc.
    
    connectToSql(height, weight) # update database
    # Return a response (optional)
    response = {'message': 'Form data received', 'height': height, 'weight': weight}

    return jsonify(response), 200

@app.route('/login-form', methods=['POST'])
def login_form():
    data = request.json  # This will contain your form data
    # Do something with the data, for example:
    username = data.get('username')
    password = data.get('password')
    # Process the data, save to database, etc.
    msg = checkUser(username, password)
    #connectToSql(username, password) # update database
    # Return a response (optional)
    response = {'message': msg, 'username': username, 'password': password}

    return jsonify(response), 200

@app.route('/signup-form', methods=['POST'])
def signup_form():
    data = request.json  # This will contain your form data
    # Do something with the data, for example:
    username = data.get('username')
    password = data.get('password')
    # Process the data, save to database, etc.
    msg = createUser(username, password)
    # Return a response (optional)
    response = {'message': msg, 'username': username, 'password': password}

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
