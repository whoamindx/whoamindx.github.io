---
layout: post
title: Iterando arrays, muito além do for.
---

Antes de mais nada, o que seria interar?

<div class="message">
  Iteração é o processo chamado na programação de repetição de uma ou mais ações. É importante salientar que cada iteração se refere a apenas uma instância da ação, ou seja, cada repetição possui uma ou mais iterações.
</div>

Isso é o que o nosso querido pai Google nos diz. É básicamente a ação de você "passar" por todos os valores existentes no array. Veja o seguinte código:


{% highlight js %}
// Array com o nome de pessoas.
const persons = [
  'Gabriel',
  'Eduardo',
  'Davi'
]

// Exibindo o nome de todas as pessoas que exista no array
for (var i = 0; i < persons.length; i++) {
  console.log(persons[i])
}
{% endhighlight %}

Este é o jeito mais simples (e arcaico) de se percorrer um array. Agora imagine que você queira por exemplo exibir somente valores que possuam mais de 5 caracteres. Seria uma boa prática você ir abrindo vários `if` dentro desse loop e ir testando?

Neste post irei apresentar à vocês 6 métodos da API de Array existente em JavaScript: forEach, filter, map, every, some e reduce.

## ForEach

Este faz o mesmo que o codigo anterior, porém escrita em menos código, mais fácil de entender e usando da programação funcional, veja:

{% highlight js %}
const persons = [
  'Gabriel',
  'Eduardo',
  'Davi'
];

/* Exibindo o nome de todas as pessoas que
   exista no array utilizando o forEach */
persons.forEach(function(person) {
  console.log(person)
})
{% endhighlight %}

Legal, não é mesmo? É simples, pode parecer difícil no começo mas eu te digo que essa dificuldade é só na sua cabeça (digo pois comigo foi o mesmo). Os métodos array no JavaScript abstrai tanto que você precisa entender somente o conceito do método.

Então, o que está sendo feito no código acima? De maneira bem simples para que você possa entender, estamos acessando o método `forEach` existente na variável persons (por ser do tipo Array, este método pode ser usado nesta variável, é o que chamamos de herança prototype) e passamos para esse método um callback. Note que este callback recebe um argumento `person` (repare na semântica, persons é a variável e person é o argumento) este argumento é o valor do array naquele momento, ou seja, se existirem 5 valores, o forEach é executado 5 vezes e o `person` assume 5 valores para cada loop.

## Filter

Este método filtra o array (o nome já diz né), mas pense o seguinte: imagine que você tenha um array com nome de usuários e cada usuário pode ser maior de idade ou não, e você queira somente os usuários que sejam maiores de idade? Nem pense em abrir uns `if` e armazenar cada usuário em uma nova variável como algo do tipo:

{% highlight js %}
const users = [
  { name: 'Gabriel', isAdult: true },
  { name: 'Eduardo', isAdult: true },
  { name: 'João', isAdult: false }
]

let adultUsers = [];

users.forEach(function(user){
  if(user.isAdult){
    adultUsers.push(user)
  }
})
{% endhighlight %}

Com o filter ficaria:

{% highlight js %}
const users = [
  { name: 'Gabriel', isAdult: true },
  { name: 'Eduardo', isAdult: true },
  { name: 'João', isAdult: false }
]

// Olha só que diferença
const adultUsers = users.filter(function(user) {
  return user.isAdult
})
{% endhighlight %}

Em 3 linhas de código você acabou de fazer o que em 5 linhas o código anterior fazia. Isso é bem bacana não é? Nem precisou de um `if` dentro, repare que os métodos Array abstraem muito.

Basicamente para cada loop você precisa retorna `true` ou `false`. Se `true` ele retorna o objeto, caso ao contrário (`false`) ele não retorna o objeto. Baseado nisso você monta a sua lógica para fazer com que ele seja retornado, ou não, dada a alguma condição.

## Every

Este método verifica se **todos** os elementos do array satisfazem a algum teste, se sim ele retorna `true`, se não `false`. Tomando como exemplo anterior o Array de usuários, se quisermos saber se todos os usuários são adultos, como ficaria do jeito tradicional e com o método `every`:

{% highlight js %}
const users = [
  { name: 'Gabriel', isAdult: true },
  { name: 'Eduardo', isAdult: true },
  { name: 'João', isAdult: false }
]

/* Esta variável será booleana, inicialmente true e dependendo
da condição irá receber false se algum usuário não for de
maior */
let allAdult = true

// Forma antiga
for (var i = 0; i < users.length; i++) {
  if(!users[i].isAdult) {
    allAdult = false
  }
}

// Com o every
allAdult = users.every(function(user) {
  return user.isAdult
});

{% endhighlight %}

Muito mais fácil de se compreender, não é?

## Some

Este faz o inverso do `every`, ao invés de retornar true se todos os elementos satisfizerem ao teste, no `some` ele retorna `true` se **pelo menos um** satisfizer.

{% highlight js %}
const users = [
  { name: 'Gabriel', isAdult: true },
  { name: 'Eduardo', isAdult: true },
  { name: 'João', isAdult: false }
]

/* Queremos saber se existe pelo menos um
usuário que seja menor de idade */
const someNotAdult = users.some(function(user) {
  return !user.isAdult
});

// someAdult receberá um true

{% endhighlight %}

## Map

Com este método você pode modificar valores do array gerando um array resultante com os valores modificados e não modificados. Por exemplo: você possui um array com vários produtos, cada produto tem seu preço e você quer retornar o preço com desconto de 10% para aquele produto.

{% highlight js %}
const products = [
  { name: 'Café', price: 3.00 },
  { name: 'Leite', price: 4.00 },
  { name: 'Suco', price: 2.50 }
]

// Produtos com seus descontos
const productsWithDiscounts = products.map(function(product) {
  product.price = product.price - (product.price * 0.10)
  return product
});

/* newProducts agora é uma copia do array products
porém com o preço de desconto:
[
  { name: 'Café', price: 2.7 },
  { name: 'Leite', price: 3.6 },
  { name: 'Suco', price: 2.25 }
] */
{% endhighlight %}

Sem muita complexidade, sem muita dificuldade e o melhor, em poucas linhas de código.

## Reduce

Com o reduce você pode percorrer o array e gerar um valor resultante baseado no item atual do array, ou seja, gerando o resultante incrementado, decrementado e assim por diante. Vamos supor que você queira o valor total de todos os produtos com descontos:

{% highlight js %}
// Suponha que você já possua o array com seus descontos
const products = [
  { name: 'Café', price: 2.70 },
  { name: 'Leite', price: 3.60 },
  { name: 'Suco', price: 2.25 }
]

// Agora vamos fazer o total dos produtos
const total = products.reduce(function(acumulador, produto) {
  return acumulador + produto.price
}, 0)
{% endhighlight %}

Calma calma, não se assuste. O `Reduce` recebe **dois** argumentos, um callback que nesse caso também recebe **dois** argumentos (mas ele pode receber até 4: `acumulador`, `valorAtual`, `indice` e `array` - O array ao qual a função reduce() foi chamada), o primeiro é o acumulador e o segundo é o elemento do array que está sendo percorrido. E o segundo argumento do `reduce` é o valor inicial do acumulador, que no caso inicializamos ele com 0 (zero).

Não se prenda ao for ou só ao forEach, a API de Array do JavaScript é muito vasta. Lógico que você pode resolver os problemas utilizando somente o `for`, mas dependendo da complexidade do problema usar somente o for não é a melhor opção, levando em consideração a legibilidade do código que fica de difícil compreensão e o pior, perceptivelmente maior. Quanto menos código escrito mais simples e fácil de compreender ele fica (obviamente, entendendo a semântica da API).

É isso, obrigado por ler até o fim e até o próximo post 😁
