function formatPhoneNo (str) {
    const regex = /(\+1[\s-]?)?(\(?\d{3}\)?)[\s,-]?(\d{3})[\s.-]?(\d{4})/g;
    let match, result = [];
    while((match= regex.exec(str)) !== null){
        const area = match[2].replace(/\D/g , "");
        const f = match[3] , l = match[4];
        const digit = area + f + l ;
        if(digit.length ===10){
            result.push(`(${area}) ${f}-${l}`)
        }
    }
    return result;
}
let output = formatPhoneNo(`Ok my no is (123) 456-7890 or 123-456-7890.
You can also reach me at 123.456.7890 or 123 456 7890.
Office: (123) 456 7890, backup: 123 (456) 7890.
International: +1 (123) 456-7890 or +1-123-456-7890.
Invalid: 12345 or 123-45-678. `);

document.getElementById("demo").innerHTML = output.join("<br>");