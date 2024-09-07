//AHADTHEGREAT'S CODE FOR HUFFMAN ENCODING AFTER EXTRACTION OF FILE

//File extraction

const fs = require("fs")

//Priority Queue import and use for freq
var pq = require("stablepriorityqueue")


//Text read from abx.txt file asyncronously
const code = fs.readFileSync("./abx.txt", { encoding: "utf8", flag: "r" })

let freq = new Map()
let xoi = new pq(function (a, b) {
    return a.val - b.val
})

class Node {
    constructor(s, val, node) {
        this.s = s
        this.val = val
        this.node = node
    }
}

function encodeMap(node, path = "", map = new Map()) {
    if (!node) return map
    if (node.s != null) {
        map.set(node.s, path)
    } else {
        if (node.node) {
            encodeMap(node.node[0], path + "0", map)
            encodeMap(node.node[1], path + "1", map)
        }
    }
    return map
}

let arr = code.split('')
arr = arr.filter((x) => {
    return x != ""
})

arr.map((x) => {
    x.split("").forEach((element) => {
        let count = freq.get(element) || 0
        freq.set(element, count + 1)
    })
})

let ar = Array.from(freq.keys())
ar.forEach((element) => {
    xoi.add(new Node(element, freq.get(element), null))
})


while (xoi.size != 2) {
    let op = xoi.poll()
    let gp = xoi.poll()

    let curr = new Node(null, op.val + gp.val, [op, gp])
    xoi.add(curr)
}
let op = xoi.poll()
let gp = xoi.poll()
let curr = new Node(null, op.val + gp.val, [op, gp])
xoi.add(curr)
let huffmantree = xoi.poll()
let encoder = encodeMap(huffmantree, "");

let compressedCode=""
for(char of code){
    compressedCode+=encoder.get(char) ;
}

fs.writeFile("./write.txt", compressedCode, (error) => {
    if (error) {
        console.log(error)
    }
})

let decodedText = "" ;
let string = "" ;

const ultaMap = new Map(Array.from(encoder, ([key, value]) => [value, key]));

for(ch of compressedCode){
    string+=ch ;

    if(ultaMap.has(string)){
        decodedText+=ultaMap.get(string) ;
        string = "" ;
    }
}

fs.writeFileSync("decoded.txt" , decodedText) ;
