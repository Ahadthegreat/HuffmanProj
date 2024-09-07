//AHADTHEGREAT'S CODE FOR HUFFMAN ENCODING AFTER EXTRACTION OF FILE

//File extraction
const { error } = require('console');
const fs = require('fs');

//Priority Queue import and use for freq
var pq = require("stablepriorityqueue");


//Text read from abx.txt file asyncronously

const code  = fs.readFileSync('./abx.txt',
    { encoding: 'utf8', flag: 'r' });

let freq=new Map();
let xoi=new pq(function(a, b) {
    return a.val-b.val;
});

class Node {
    constructor(s, val, node) {
        this.s = s;      
        this.val = val;  
        this.node = node; 
    }
}

function removezero(str) {
    let i = str.length - 1;
    while (i >= 0 && str[i] === '0') {
        i--;
    }
    return str.substring(0, i + 1) || '0';
}

function encodeMap(node, path = '', map = new Map()) {
    if (!node) return map;
    if (node.s != null) {
        map.set(node.s, removezero(path));
    } else {
        if (node.node) {
            encodeMap(node.node[0], path + '0', map);
            encodeMap(node.node[1], path + '1', map);
        }
    }
    return map;
}

    let arr=code.split('\r\n');
    arr=arr.filter((x)=>{
        return x!=''
    })
    arr.map((x)=>{
        x.split('').forEach(element => {
            let count = freq.get(element) || 0;
        freq.set(element, count + 1);

        });
    })


    let ar=Array.from(freq.keys());
    ar.forEach(element => {
        xoi.add(new Node(element, freq.get(element), null));
        // console.log(element+" "+freq.get(element));
    });


    console.log(xoi.size+"    "+`size`);

    // const se = [...freq.entries()].sort((a, b) => a[1] - b[1]);
    // se.forEach(ele => {
    //     console.log(ele);
        
    // });
    
    while(xoi.size!=2){
        let op=xoi.poll();
        let gp=xoi.poll();

        let curr = new Node(null, op.val + gp.val, [op, gp]);
        xoi.add(curr);
    }
        let op=xoi.poll();
        let gp=xoi.poll();
        let curr = new Node(null, op.val + gp.val, [op, gp]);
        xoi.add(curr);
        let huffmantree=xoi.poll();
        let encoder=encodeMap(huffmantree,'');
        console.log(`ENCODED CHARACTERS ARE AS :-`);
        
        // console.log(encoder);
        
        // console.log(huffmantree.node+" ");
        
        console.log('hello');
        // console.log(encoder.get('C'));
        
        let compressedCode;
        let temp=code.split('');
        let c=0;
        temp.forEach(ele=>{
            if(c!=0){
            if(ele!=' '&&ele!='\n'&&ele!='\r'){
                compressedCode+=`${encoder.get(ele)} `;
            }else if(ele=='\n'||ele=='\r'){
                if(ele=='\n')compressedCode+='\n'
            }else{
                compressedCode+='  ';
            }
            }
            c++;
        })
        // console.log(compressedCode);
        fs.writeFile('./write.txt',compressedCode,err=>{
            if(error){
                console.log(error);
            }

            //CHOMD locks file after writing but for multiple edition of code we don't want
            //locking of write file  

            // fs.chmod('./write.txt', 0o444, err => {
            //     if (err) {
            //         console.error('Error changing file permissions:', err);
            //         return;
            //     }
            //     console.log('READ FILE LOCKED MASTER');
            // })
        });

