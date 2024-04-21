from flask import Flask, request, jsonify
from flask_cors import CORS
from constants_sql import Constants
import mysql.connector

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) # allows localhost to access the flask server

def getStats(id):
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        selectStats = """
            SELECT * FROM users_stats WHERE id = %s;
        """

        cursor.execute(selectStats, (id,))
        
        rows = cursor.fetchall()

        # Get column names
        columns = [col[0] for col in cursor.description]

        # Format rows into dictionary
        stats_json = []
        for row in rows:
            stats_json.append(dict(zip(columns, row)))

        return stats_json

    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

def getMealStats(meal_name):
    return 1 #entire function that gets meal stats

def addFavs(id, meal_name):
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        updateFavs = """
            UPDATE users_favs SET meal_name = %s WHERE id = %s;
        """

        cursor.execute(updateFavs, (meal_name, id))

    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

def updateColumn(columnName, value, id):
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        updateQuery = """
            UPDATE users_stats SET {} = %s WHERE id = %s;
        """.format(columnName)

        cursor.execute(updateQuery, (value, id))

    except mysql.connector.Error as error:
        print("Error occured: ", error)

        
    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

def getUserId(username):
    id = None
    try:
        connection = mysql.connector.connect(user=Constants.USER, password=Constants.PASSWORD, database=Constants.DATABASE)
        cursor = connection.cursor(buffered=True)

        validCheck = """
            SELECT person_id from users_login WHERE username = %s
        """

        cursor.execute(validCheck, (username,))
        valid = cursor.fetchall()

        id = valid[0][0]

    except mysql.connector.Error as error:
        print("Error occured: ", error)

    finally:
        connection.commit()

        cursor.close()
        connection.close()
        print("Connection closed")

    return id

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

@app.route('/generate-form', methods=['GET'])
def generate_form():
    id = request.args.get('id', type=int)
    print(id)
    response = getStats(id)
    return jsonify(response), 200


@app.route('/info-form', methods=['POST'])
def submit_form():
    data = request.json  # This will contain your form data
    # Do something with the data, for example:
    id = data.get('id')
    height = data.get('height')
    weight = data.get('weight')
    desiredWeight = data.get('desiredWeight')
    age = data.get('age')
    budget = data.get('budget')

    # Process the data, save to database, etc.
    
    # connectToSql(height, weight) # update database
    updateColumn('height', height, id)
    updateColumn('weight', weight, id)
    updateColumn('desiredWeight', desiredWeight, id)
    updateColumn('age', age, id)
    updateColumn('budget', budget, id)
    # Return a response (optional)
    response = {'message': 'Updated your stats.', 'height': height, 'weight': weight, 'desiredWeight': desiredWeight, 'age': age, 'budget': budget, 'id': id}

    return jsonify(response), 200

@app.route('/login-form', methods=['POST'])
def login_form():
    data = request.json  # This will contain your form data
    # Do something with the data, for example:
    username = data.get('username')
    password = data.get('password')
    # Process the data, save to database, etc.
    msg = checkUser(username, password)
    id = None
    if msg != "Incorrect username/password.":
        id = getUserId(username)
    #connectToSql(username, password) # update database
    # Return a response (optional)
    response = {'message': msg, 'username': username, 'password': password, 'id': id}

    return jsonify(response), 200

@app.route('/signup-form', methods=['POST'])
def signup_form():
    data = request.json  # This will contain your form data
    # Do something with the data, for example:
    username = data.get('username')
    password = data.get('password')
    # Process the data, save to database, etc.
    msg = createUser(username, password)
    id = getUserId(username)
    # Return a response (optional)
    response = {'message': msg, 'username': username, 'password': password, 'id': id}

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
