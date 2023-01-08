import requests
import json


def get_db(url: str, point: str, headers: dict):
    res = requests.get(f"{url}/{point}", headers=headers)
    print(res.status_code)
    data_list = res.json()
    
    return data_list

def post_db(url, point, body):
    res = requests.post(f"{url}/{point}", json=body)
    print(res.status_code)
    
def put_db(url, point, id, body):
    res = requests.put(f"{url}/{point}/{id}", json=body)
    print(res.status_code)
    
def delete_db(url, point, id):
    res = requests.delete(f"{url}/{point}/{id}")
    print(res.status_code)

def output_db():
    data_list = get_db(url, point, headers)
    for data in data_list:
        print(data['id'], data['title'], data['comment'])
        

if __name__ == '__main__':
    url = "http://localhost:4000"
    point = "booklog"
    headers = {"content-type": "application/json"}
    print("======================")
    print("Get Method")
    output_db()
    
    print("======================")
    print("POST Method")
    body = {
        "title": "Python",
        "comment": "Analyze big data"
    }
    post_db(url, "booklog", body)
    output_db()
    
    print("======================")
    print("PUT Method")
    body = {
        "title": "JS",
        "comment": "create Web App"
    }
    put_db(url, point, 41, body)
    output_db()
    
    print("======================")
    print("DELETE Method")
    delete_db(url, point, 46)
    output_db()
    