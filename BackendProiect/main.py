import time

import mysql.connector
import requests
import yaml

# Endpoint URL
endpoint_url = "http://192.168.108.170:80/sensors"  # Replace this with your actual endpoint URL

with open('config.yaml', 'r') as file:
    config = yaml.safe_load(file)

# Access MySQL connection details
mysql_config = config.get('mysql', {})

host = mysql_config.get('host')
port = mysql_config.get('port')
database = mysql_config.get('database')
user = mysql_config.get('user')
password = mysql_config.get('password')
table_name = mysql_config.get('table_name')

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
                password=password
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
