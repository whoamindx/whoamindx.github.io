---
layout: post
title: Um pouco sobre ES6 Proxies
---

Sim sim, sei que já estamos no ES9 e este é um recurso do ES2015 mas decidi escrever esse post por dois motivos: conheci este recurso recetemente e simplesmente amei; segundo que a droga desse blog é meu e se eu quiser eu escrevo até sobre como fazer AJAX no IE8!

Brincadeiras a parte, mas falando seriamente agora: conversei com alguns Dev e poucos conheciam essa feature, e como eu gosto muito de contar para o mundo as novidades que eu descubro eu decidi escrever este post.

Mas vamos logo partir para o que interessa, e como de costume vou dar a definicão de o que é a coisa só para vocês ficaram com a aquela linda frase na cabeça: "Não entendi nada mas vou continuar lendo para ver se entendo" (Como de costume em todos os artigos de desenvolvimento que lemos):

<div class="message">
  O objeto Proxy é usado para definir comportamentos customizados para operações fundamentais (por exemplo, pesquisa de propriedade, atribuição, enumeração, invocação de função, etc.).
</div>
Fonte: <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Proxy" target="_blank">MDN</a>

Já na <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Proxy" target="_blank">Microsoft Developer Network</a> eles dão essa definição:

<div class="message">
  Um objeto Proxy é usado para interceptar operações internas de nível baixo em outro objeto.Objetos de proxy podem ser usados para interceptação, virtualização de objeto, registro em log/criação de perfil e outras finalidades.
</div>
 
Se continuou lendo até aqui e não entendeu nada, <a href="http://loopinfinito.com.br/2014/09/09/ecmascript-6-proxy/" target="_blank">este post</a> explica muito bem:

<div class="message">
	O termo  _proxy_  tem suas origens no Direito dos países de língua inglesa. Um  _proxy_  é alguém com poderes legais de representar uma outra pessoa. No Brasil seria algo como alguém que possui uma procuração para representar uma outra. Por analogia, o termo acabou sendo usado na computação para designar  _softwares_  que atuam por outros como, por exemplo, um  <a href="http://en.wikipedia.org/wiki/Proxy_server" target="_blank">Web Proxy</a>, que funciona como um intermediário para requisições de um cliente a um servidor externo.

	No ECMAScript 6, um  _proxy_  é um objeto que  **representa**  um outro. Ele é capaz de interceptar chamadas às propriedades do objeto alvo, podendo até mesmo alterar o resultado da chamada.
</div>

Bem, agora a definição desleixada que eu dou para facilitar mais ainda o seu entendimento é: Proxy no JavaScript nada mais é do que uma classe chama **Proxy** que ao instancia ela na sua aplicação ela passa a se tornar uma algo "falso", um "mentiroso" no seu sistema podendo se passar por algum objeto.

## No código tudo fica mais fácil

Suponhamos que exista aquela tão famosa classe `Pessoa`:

{% highlight js %}
class Pessoa{
	
	constructor(nome,idade){
		this._nome = nome;
		this._idade = idade;
	}

	get nome(){
		return this._nome;
	}

	get idade(){
		return this._idade;
	}
	
}
{% endhighlight %}

Até aí tudo bem, nada demais ok? Agora irei instanciar essa classe:

{% highlight js %}
let me = new Pessoa("Gabriel", 19);
{% endhighlight %}

Ainda nada de interessante, se acessarmos **me.nome** irá retornar **Gabriel**, o mesmo com a idade irá retonar 19. O objetivo aqui desse post é você entender como funciona a Proxy, não irei entrar em muito detalhes sobre o uso dela para não nos extendermos aqui. Agora vamos criar um `mentiroso`, alguém se passando por mim, quero que quando alguem acessar **me.nome** não retorne **Gabriel** mas sim **João**.

Para criarmos usaremos a seguinte sintaxe para criar esse **mentiroso**:

{% highlight js %}
let meFalse = new Proxy(me, {
	get(target, prop, receiver){
		if (prop == 'nome') return `João`;
		if (prop == 'idade') return 23;
	}
});
{% endhighlight %}

Não se assuste, basicamente estou instanciando no `meFalse` um novo Proxy, que recebe como argumento o objeto ao qual ele quer interceptar (no caso o objeto `me`) e o segundo argumento é um objeto `handler` que vai conter as conhecidas `traps` (Métodos que fornecem acesso à propriedade, podendo manipular o fluxo entre o sistema e as propriedades do objeto).

Note que dentro temos a propriedade **get**, ele é padrão para interceptar caso acontece um _getter_. E você não precisa ser nenhum mestre das advinhações para descobrir como faz para intecpetar um _setter_, só colocar um método **set**. Existem muitos outros como **has**, **setPrototypeOf**, **getPrototypeOf** e etc. O objetivo aqui é entender o Proxy e não dar um Wikipedia dele.

Repare também que o método recebe três argumentos (`target`,`prop` e `receiver`). Só um momento estou respirando... O `target` é o objeto que está sendo inteceptado, nesse caso é o objeto **me**, ele é o objeto real que é encapsulado pelo proxy. O `prop` é a propriedade do objeto sendo acessado (métodos também são interceptados). O terceiro `receiver` é uma referência ao próprio Proxy.

Agora não tem mais segredo, estou apenas verificando se a propriedade é nome, se for eu exibo "João". Também posso por exemplo retornar meu nome e sobrenome nome como:

{% highlight js %}
.
.
.
	get(target, prop, receiver){
		if (prop == 'nome') return `${target[prop]} Napoleão`;
.
.
{% endhighlight %}

Nesse caso, quando eu acessasse `meFalse.nome` ele retornaria **Gabriel Napoleão**.

Agora a pergunta que com certeza você está fazendo: "Quando vou utilizar isso?". Suponhamos que você tem um sitema MVC aonde o model quando for alterado tenha que atualizar a sua view, ao invés de misturar código da view no model para atualizar, no controller você poderia usar do Proxy para se passar pelo model que está sendo atualizada e interceptando as propriedades aonde caso ela seja alterada, você injetaria a atualização da View dentro do `set` do Proxy.

Bem, por hora é somente isso, caso não tenha entendido algo deixe um comentário que tentarei tirar sua dúvida.
