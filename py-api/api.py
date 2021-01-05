import json

from flask import Flask, request, Response
from flask_cors import CORS, cross_origin

from AStar import astar

app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route('/api/astar', methods=["POST"])
def get_astar_solution():
    r = request.get_json()
    start = (r['start'][0], r['start'][1])
    end = (r['end'][0], r['end'][1])
    grid = r['grid']

    result = astar(grid, start, end)
    print(result)

    res = Response(mimetype="application/json", headers={'Access-Control-Allow-Origin': '*'})
    res.data = json.dumps(result)

    return res
