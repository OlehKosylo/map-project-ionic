export class FindShortestPath {
    constructor(rawData, source, destination) {
        this.coordinates = {}

        for (let coordinate of rawData) {
            this.coordinates[coordinate.name] = {}
            this.coordinates[coordinate.name]["lat"] = coordinate.lat
            this.coordinates[coordinate.name]["lng"] = coordinate.lng
        }

        this.source = source
        this.destination = destination
        this.coordinates.source = this.source
        this.coordinates.destination = this.destination
    }

    distance(a, b) {
        function deg2rad(deg) {
            return deg * (Math.PI / 180)
        }

        const R = 6371
        let dLat = deg2rad(a.lat - b.lat)
        let dLng = deg2rad(a.lng - b.lng)
        let A = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(a.lat)) * Math.cos(deg2rad(b.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
        let C = 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A))
        let D = R * C
        return D
    }

    constructGraph() {
        this.graph = {}

        for (let point in this.coordinates) {
            for (let adj in this.coordinates) {
                if (point === adj) {
                    continue
                }

                const distance = this.distance(this.coordinates[point], this.coordinates[adj]);

                if (distance <= 100) {
                    this.graph[point] = this.graph[point] || {}
                    this.graph[point][adj] = distance;
                }
            }
        }
    }

    generateSteps() {
        const coordinates = Object.keys(this.coordinates).map((key) => ({
            key, value: {
                lat: this.coordinates[key].lat,
                lng: this.coordinates[key].lng,
            }
        }))

        this.constructGraph();
        const graph = {...this.graph};

        let prevStep = 'source';
        const steps = []

        function foundNextStep(nextStep = 'source') {
            if (steps.length === Object.keys(graph).length) {
                return;
            }

            delete graph[nextStep][prevStep]
            prevStep = nextStep;
            steps.push(coordinates.find(c => c.key === nextStep).value)

            const theShortestStep = Math.min.apply(null, Object.values(graph[nextStep]));
            foundNextStep(Object.keys(graph[nextStep]).find(key => graph[nextStep][key] === theShortestStep));

        }

        foundNextStep();

        return steps || [];
    }
}
