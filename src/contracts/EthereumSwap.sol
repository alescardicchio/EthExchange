pragma solidity >=0.4.20; // dichiarazione della versione di Solidity.

// Importiamo il contratto che realizza il Token
import "./Token.sol";

// Contratto che realizza la logica necessaria per l'acquisto e la vendita di Token
contract EthereumSwap {
    string public name = "Ethereum Instant Exchange";
    Token public token; // variabile che rappresenta il token
    uint public rate = 100; // # di token che vengono ricevuti per 1 ether (1 ETH = 100 Token)

    event TokenAcquistati(
        address account,
        address token,
        uint quantita,
        uint rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    // Funzione che permette l'acquisto di token
    // msg è una variabile globale in Solidity,
    // .sender restituisce l'address di chi invoca la funzione. 
    // .value restituisce l'ammontare di ether inviati da parte di chi invoca la funzione.
    function buyTokens() public payable {
        // Calcolo del numero di Token da acquistare 
        uint tokenAmount = msg.value * rate; // quantità di Ethereum da convertire * tasso di conversione
        
        // Check che l'exchange possegga almeno la quantità di token richiesta
        require(token.balanceOf(address(this)) >= tokenAmount);
        
        // Trasferimento di token all'utente
        token.transfer(msg.sender, tokenAmount); 

        // Emissione dell'evento
        emit TokenAcquistati(msg.sender, address(token), tokenAmount, rate);
    }

    // Funzione che permette la vendita di token
    function sellTokens(uint _amount) public {
        // Calcolo del numero di Ether da dare all'utente
        uint etherAmount = _amount / rate; // quantità di Token da convertire / tasso di conversione
        
        // Trasferimento di token dall'utente all'exchange
        token.transferFrom(msg.sender, address(this), _amount);
        // msg.sender(utente) riceve gli eth da questo contratto
        msg.sender.transfer(etherAmount);
    }
}