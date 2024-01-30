const ethers = require("ethers");
const { abi, code } = require("./constants");

// Json Rpc provider to the blast network
const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/blast_testnet_sepolia');

//wallet instance of the contract admin
const admin = new ethers.Wallet("b72cb42b3319abb30fc17f7e20ea58165a84de90c9afd90fcb80382062e01382", provider);


async function main(){
    await create_and_list_product()
}


//This function creates a product on the blockchain where
    // product_id: the product of the product being listed on chain
    // amount: price of the product
    // merchant_id: user_id of the project creator
    // creator: wallet address of the project creator
async function create_and_list_product(product_id, amount, merchant_id,creator){
    // address of the smart contract on the blast blockchain
    const marketplaceAddr = "0xa24e680152C168cbBf5e8D62060bF55A8dd71BD6";
    const contract = new ethers.Contract(marketplaceAddr, abi, admin);
    let list_product = await contract.createProduct(product_id,amount,merchant_id,creator);
    let tx = await list_product.wait();
    console.log(list_product)
    console.log(tx)

}


async function order_product(product_id,amount,buyer_id,wallet){
    const marketplaceAddr = "0xa24e680152C168cbBf5e8D62060bF55A8dd71BD6" //"0x686690ef4a57F11A4980e0053E2D1EdD69782F35";
    const contract = new ethers.Contract(marketplaceAddr, abi, wallet);
    let order = await contract.orderProduct(product_id,amount,buyer_id, {value:ethers.parseEther(amount)});
    let tx = await order.wait();
    console.log(order);
    console.log(tx);

}

async function confirm_order(product_id){
    const marketplaceAddr = '0xa24e680152C168cbBf5e8D62060bF55A8dd71BD6' //"0x686690ef4a57F11A4980e0053E2D1EdD69782F35";
    const contract = new ethers.Contract(marketplaceAddr, abi, admin);
    let confirm = await contract.confirmOrder(product_id);
    let tx = await confirm.wait();
    console.log(confirm)
    console.log(tx)

}

async function sendTransaction(privateKey,amount,toAddress){
    
    const wallet = new ethers.Wallet(privateKey, provider);
    //const wallet = new ethers.Wallet.fromPhrase(privateKey);

    // Validate the toAddress
    if (!ethers.isAddress(toAddress)) {
        throw new Error('Invalid Ethereum address');
    }

    // Convert amount to Wei (1 Ether = 1e18 Wei)
    const amountWei = ethers.parseEther(amount.toString());

    // Create a transaction
    const transaction = {
        to: toAddress,
        value: amountWei,
    };

    // Send the transaction
    const tx = await wallet.sendTransaction(transaction);
    // Wait for the transaction to be mined
    await tx.wait();

    console.log(`Successfully transferred ${amount} Ether to ${toAddress}`);


}


main().then((err) => {
    console.log(err)
})