sample=()=>{
    fetch('http://localhost:8021/all',{method:GET})
    .then((data)=>{
        console.log(data)
    })
}

sample();