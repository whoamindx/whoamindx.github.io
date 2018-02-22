---
layout: post
title: Iterando arrays, muito além do for.
---

Antes de mais nada, o que seria interar?

<div class="message">
  Iteração é o processo chamado na programação de repetição de uma ou mais ações. É importante salientar que cada iteração se refere a apenas uma instância da ação, ou seja, cada repetição possui uma ou mais iterações.
</div>

Isso é o que o nosso querido pai Google nos diz. É básicamente a ação de você "passar" por todos os valores existente no array. Veja o seguinte código:


{% highlight js %}
// Array com o nome de pessoas.
let persons = [
  "Gabriel",
  "Eduardo",
  "Davi"
];

// Exibindo o nome de todas as pessoas que exista no array
for (var i = 0; i < persons.length; i++){
   console.log(persons[i]);
}
{% endhighlight %}

Este é o jeito mais simples (e arcaico) de se percorrer um array. Agora imagine que você queira por exemplo exibir somente valores com que possua mais de 5 caracteres por exemplo? Seria uma boa prática você ir abrindo vários `if` dentro desse loop e ir testando?

Neste post irei apresentar à vocês 6 métodos da API de Array existente em JavaScript: forEach, filter, map, every, some e reduce.

## ForEach

Este faz o mesmo que o codigo anterior, porém escrita em menos código e mais fácil de se entender, veja:

{% highlight js %}
let persons = [
  "Gabriel",
  "Eduardo",
  "Davi"
];

/* Exibindo o nome de todas as pessoas que exista
no array utilizando o forEach */
persons.forEach(function(person){
  console.log(person);
})
{% endhighlight %}

Legal, não é mesmo? É simples, pode parecer difícil no começo mas eu te digo que essa dificuldade é só na sua cabeça (digo pois comigo foi o mesmo). Os métodos array no JavaScript abstrai tanto que você precisa entender somente o conceito do método.

Então, o que está sendo feito no código acima? De maneira bem simples para que você possa entender, estamos acessando o método `forEach` existente na variável persons (por ser do tipo Array, este método pode ser usado nesta variável, é o que chamamos de herança prototype) e passamos para esse método um callback, note que este callback recebe um argumento `person` (repare na semântica, persons é a variável e person é o argumento) este argumento é o valor do array naquele momento ou seja, se existir 5 valores, o forEach é executado 5 vezes e o `person` assume 5 valores para cada loop.

## Filter

Este método ele filtra o array (o nome já diz né), mas pense o seguinte, imagine que você tenha um array com nome de usuários e cada usuário pode ser maior de idade ou não, e você queira somente todos os usuários que sejam maior de idade? Nem pense em abrir uns `if` e armazenar cada usuário em uma nova variável como algo do tipo:

{% highlight js %}
let users = [
  {name: "Gabriel", isAdult: true},
  {name: "Eduardo", isAdult: true},
  {name: "João", isAdult: false}
];

let adultUsers = [];

users.forEach(function(user){
  if(user.isAdult){
    adultUsers.push(user)
  }
})
{% endhighlight %}

Com o filter ficaria:

{% highlight js %}
let users = [
  {name: "Gabriel", isAdult: true},
  {name: "Eduardo", isAdult: true},
  {name: "João", isAdult: false}
];

// Olha só que diferença
users = users.filter(function(user){
  return user.isAdult;
});
{% endhighlight %}

Em 3 linhas de código você acabou de fazer o que em 5 linhas o código anterior fazia. Isso é bem bacana não é? Nem precisou de um `if` dentro, repare que os métodos Array abstrai muito, a única dificuldade que você terá para se acostumar é só a questão do sentido que aquele método faz.

## Every

Este método ele verifica se **todos** os elementos do array satisfarça a algum teste, se sim ele retorna `true`, se não `false`. Tomando como exemplo anterior o Array de usuários, se quisermos saber se todos os usuários são adultos, como ficaria jeito tradicional e com o método `every`:

{% highlight js %}
let users = [
  {name: "Gabriel", isAdult: true},
  {name: "Eduardo", isAdult: true},
  {name: "João", isAdult: false}
];

/* Esta variável será booleana, inicialmente true e dependendo
da condição irá receber falsa se algum usuário não for de
maior */
let allAdult = true;

// Forma antiga
for (var i = 0; i < users.length; i++){
  if(!users[i].isAdult){
    allAdult = false;
  }
}

// Com o every
allAdult = users.every(function(user){
  return user.isAdult;
});

{% endhighlight %}

Muito mais fácil de se compreender não é?

## Some

Este faz o inverso do `every`, ao invés de retorna true se todos os elementos satisfazer ao teste, no `some` ele retorna `true` se **pelo menos um** satisfazer o teste.

{% highlight js %}
let users = [
  {name: "Gabriel", isAdult: true},
  {name: "Eduardo", isAdult: true},
  {name: "João", isAdult: false}
];

let someAdult;

/* Queremos saber se existe pelo menos um
usuário que seja de menor */
someAdult = users.some(function(user){
  return !user.isAdult;
});

// someAdult receberá um false

{% endhighlight %}

## Map

Com este método você pode de certa forma "traduzir" ou "modificar" valores do array para um novo array. Por exemplo: você possui um array com vários produtos e esses produtor tem seus preço e você queira retornar um desconto de 10% para aquele produto.

{% highlight js %}
let products = [
  {name: "Café", price: 3.00},
  {name: "Leite", price: 4.00},
  {name: "Suco", price: 2.50}
];

// Produtos com seus descontos
let newProducts;

newProducts = products.map(function(product){
  product.price = product.price - (product.price*0.10);
  return product
});

/* newProducts agora é uma copia do array products
porém com o preço de desconto */
{% endhighlight %}

Sem muita complexidade, e sem muita dificuldade e o melhor, em poucas linhas de código.

## Reduce

Com o reduce você pode percorrer o array e ir valores ou seja, acumulando os valor, vamo supor que você queira o valor total de todos os produtos com descontos:

{% highlight js %}
// Suponha que você já possua o array com seus descontos
let products = [
  {name: "Café", price: 2.70},
  {name: "Leite", price: 3.60},
  {name: "Suco", price: 2.25}
];

// Valor total
let total;

// Agora vamos fazer o total dos produtos
total = products.reduce(function(valorAtual, produto){
  return valorAtual + produto.price;
},0)
{% endhighlight %}

Calma calma, não se assuste. O `Reduce` recebe **dois** argumentos, um callback que também recebe **dois** argumentos (o primeiro é o acumulador e o segundo é o elemento do array) e o segundo é o valor inicial do acumulador, que no caso inicializamos ele com 0 (zero).

Não se prenda ao for ou só ao forEach, a API de Array do JavaScript é muito vasta, lógico que você pode resolver os problemas utilizando somente o `for`, mas dependendo da complexidade do problema usar somente o ele pode resultar em perca de perfomance, fora a legibilidade do código que fica de difícil compreensão e o pior, é o tamanho do código. Quanto menos código escrito mais simples e fácil de compreender ele fica.

É isso, obrigado por ler até o fim e até o próximo post 😁
