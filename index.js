const ethers = require("ethers");
const { abi, code } = require("./constants");

const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/blast_testnet_sepolia');

const admin = new ethers.Wallet("b72cb42b3319abb30fc17f7e20ea58165a84de90c9afd90fcb80382062e01382", provider);


async function main(){
    await create_and_list_product()
}

async function create_and_list_product(product_id, amount, merchant_id,creator){
    const marketplaceAddr = "0x686690ef4a57F11A4980e0053E2D1EdD69782F35";
    const contract = new ethers.Contract(marketplaceAddr, abi, admin);
    let list_product = await contract.createProduct(product_id,amount,merchant_id,creator);
    let tx = await list_product.wait();
    console.log(list_product)
    console.log(tx)

}


async function order_product(product_id,amount,buyer_id,wallet){
    const marketplaceAddr = "0x686690ef4a57F11A4980e0053E2D1EdD69782F35";
    const contract = new ethers.Contract(marketplaceAddr, abi, wallet);
    let order = await contract.createProduct(product_id,amount,buyer_id);
    let tx = await order.wait();
    console.log(order);
    console.log(tx);

}

async function confirm_order(product_id){
    const marketplaceAddr = "0x686690ef4a57F11A4980e0053E2D1EdD69782F35";
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


main().then(err => {
    console.log(err)
})