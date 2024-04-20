from flask import Flask, request, jsonify
from flask_cors import CORS
from constants_sql import Constants
import mysql.connector

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) # allows localhost to access the flask server

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


@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.json  # This will contain your form data
    # Do something with the data, for example:
    height = data.get('height')
    weight = data.get('weight')
    # Process the data, save to database, etc.
    
    # Return a response (optional)
    response = {'message': 'Form data received', 'height': height, 'weight': weight}
    print(response)

    connectToSql(height, weight) # update database
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
