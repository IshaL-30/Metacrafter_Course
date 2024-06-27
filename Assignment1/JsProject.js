/*
Assessment Requirements
1. Create a variable that can hold a number of NFT's. What type of variable might this be?
2. Create an object inside your mintNFT function that will hold the metadata for your NFTs. 
   The metadata values will be passed to the function as parameters. When the NFT is ready, 
   you will store it in the variable you created in step 1
3. Your listNFTs() function will print all of your NFTs metadata to the console (i.e. console.log("Name: " + someNFT.name))
4. For good measure, getTotalSupply() should return the number of NFT's you have created
*/

const NFTs = [];

// this function will take in some values as parameters, create an
// NFT object using the parameters passed to it for its metadata, 
// and store it in the variable above.
function mintNFT (name, standard, gender, performance) {
    let metadata = {
        "obname" : name,
        "obstd" : standard,
        "obgender" : gender,
        "obperformance" : performance
    };
    NFTs.push(metadata);
}

// create a "loop" that will go through an "array" of NFT's
// and print their metadata with console.log()
function listNFTs () {
    for(let i=0;i<NFTs.length;i++)
        {
            console.log("\n\nID: " + (i+1) + "\t Name: "+ NFTs[i].obname);
            console.log("\nName:  \t\t"+ " " + NFTs[i].obname);
            console.log("Standard:  \t"+ " " + NFTs[i].obstd);
            console.log("Gender:   \t"+ " "+ NFTs[i].obgender);
            console.log("Performance: "+ NFTs[i].obperformance);
        }
}

// print the total number of NFTs we have minted to the console
function getTotalSupply() {
    console.log("\nTotal number of NFTs minted to the console: "+ NFTs.length);
}

// call your functions below this line
mintNFT("John", 11, "male", 9);
mintNFT("Siya", 10, "female", 10);
mintNFT("Bob", 12, "male", 8);
mintNFT("James", 11, "male", 10);
mintNFT("Riya", 10, "female", 9);
listNFTs();
getTotalSupply();