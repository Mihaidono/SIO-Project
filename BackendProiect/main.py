import time

import mysql.connector
import requests

# Endpoint URL
endpoint_url = "http://192.168.149.170:80/sensors"  # Replace this with your actual endpoint URL

# MySQL connection details
host = "aws.connect.psdb.cloud"
port = 3306
database = "test"
user = "o0i2apl0ppyimrwknzi1"
passwordDB = "pscale_pw_g2bnOnYuULaHdFZRwWpmyBQ4qeXqG2mgiH42DhYL1kd"
table_name = "sensors_data"
while True:
    # Fetching data from the endpoint
    response = requests.get(endpoint_url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        data = response.json()  # Assuming the response contains JSON data, adjust accordingly if it's different
        # Establish MySQL connection
        try:
            conn = mysql.connector.connect(
                host=host,
                port=port,
                database=database,
                user=user,
                password=passwordDB
            )
            cursor = conn.cursor()

            query = f"INSERT INTO {table_name} (brightness_sensor, humidity_sensor ,temperature_sensor) VALUES (%s, %s, %s)"
            cursor.execute(query, (int(data['brightness']), int(data['moisture']), float(data['temperature'])))

            conn.commit()
            print(f"Written {data} to Database")

        except mysql.connector.Error as error:
            print(f"Error: {error}")

        finally:
            if 'conn' in locals() and conn.is_connected():
                cursor.close()
                conn.close()
                print("MySQL Transaction finished successfully")
    else:
        print("Failed to fetch data from the endpoint")
    # Pause for a while before fetching data again (adjust the duration as needed)
    time.sleep(1)  # Fetch data every 60 seconds
