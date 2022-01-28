pragma solidity >=0.4.20;

//il nostro token
contract Token {

    //nome token
    string public name = "RomaTre Token";
    //simbolo token
    string public symbol = "RM3";
    //definizione dallo standard
    uint256 public totalSupply;
    //mappa indirizzi -> saldo token 
    mapping(address => uint256) public balanceOf;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    //costruttore 
    constructor(uint256 _initialSupply) public {
        //msg.sender inidrizzo chi effettua il deploy del contratto
        //assegnazione dei token ad un indirizzo
        balanceOf[msg.sender] = _initialSupply;
        //set numero totale di tokens
        totalSupply = _initialSupply;
    }

    //trasferimento (return un boolano)
    //eccezione se l'account non ha saldo sufficiente
    function transfer(address _to, uint256 _value) public returns (bool success){
        //require -> se la condizione è vera continua l'esecuzione, altrimenti errore
        require(balanceOf[msg.sender] >= _value);
        //trasferiento della somma
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        //transfer event
        emit Transfer(msg.sender, _to, _value);

        return true;
    }


    
    //funzione getter creata di default dallo standard
    //funzione balanceOf creata di default dallo standard
    
}