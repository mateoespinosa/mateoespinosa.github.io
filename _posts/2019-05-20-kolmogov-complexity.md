---
layout: single
classes: wide
title: "Compressing Prime Numbers: Kolmogorov Complexity 101"
excerpt: "A tiny bit of light on Kolmogorov Complexity and the incompressibility method."
date: 2019-05-20 13:00:00 -0600
categories:
  - mathematics
  - computer-science
tags:
  - mathematics
  - computer-science
  - information-theory
comments: true
classes: wide
style: |
  #page-title {
    font-family: 'Share Tech Mono', monospace;
  }

toc: true
toc_label: Dat Table of Contents
toc_icon: "sitemap"
toc_sticky: false
header:
  teaser: https://upload.wikimedia.org/wikipedia/commons/d/d4/Mandelpart2_red.png
---

## Introduction

[Andrey Kolmogorov](https://en.wikipedia.org/wiki/Andrey_Kolmogorov) is far from being an unknown name in most fields of intellectual inquiry. Mostly known for establishing the foundations of probability theory (the unforgettable [Kolmogorov Axioms](https://en.wikipedia.org/wiki/Probability_axioms)), the list of things named after him is quite astonishing: [Kolmogorov space](https://en.wikipedia.org/wiki/Kolmogorov_space), [Kolmogorov equations](https://en.wikipedia.org/wiki/Kolmogorov_equations), [Kolmogorov Integral](https://en.wikipedia.org/wiki/Kolmogorov_integral), [Kolmogorov-Smirnov test](https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test), and so many more. This stands in a blunt contrast with the little we tend to hear about Kolmogorov and his life compared to other mathematicians/scientists of him same "caliber" (just look at how relatively short his Wikipedia biography is). Because of this, I wanted to spend some time discussing a topic which unfortunately usually escapes most undergraduate mathematics/computer science curricula: Kolmogorv Complexity.

This is a fascinating topic lying on the intersection of the theory of computation, information theory, and probability theory. Its aim is a simple yet astonishingly rich one: to formalize the notion of describing how "complex" a given object is through a mechanism that depends only on the intrinsic properties of the object itself. Kolmogorov complexity approaches this problem by establish a complete mechanism for describing the intrinsic complexity of objects based on the following surprising and non-trivial result: one can think of the length of the shortest program (in bits) that generates an object as a measurement of the intrinsic complexity of that object. In other words: the shortest program that generates an object tells you how much information that object really contains.

For example, the string `"4242424242424242"` seems to have some sort of repetitive pattern that is missing in the string `"7134618915756138"`. The former has some structure whereas the latter seems completely random (and it kinda is, I just hit my hand against my keys to generate it). Now let's think about the length of, say, a Python program that could generate the first string and one that can generate the second string.

The following Python function will generate the first string:

{% highlight  python%}
def main():
    return "42" * 8
{% endhighlight %}

Compare the length of this program to the length of a Python program that would take to generate the second string:

{% highlight  python%}
def main():
    return "7134618915756138"
{% endhighlight %}

It seems as if the shortest program we can think of to generate the second string is not doing anything "fancier" than returning the string itself. This gives us some sort of notion of what a truly random object is: if we cannot represent a object with a program shorter than the object itself, then this object must be "random" (or commonly called **Kolmogorov random**) as it seems to have no real, or at least "discoverable", structure. It rather seems incompressible. In our example above, even though both strings are of the same length, one could be compressed with a shorter program than the string itself whereas the other one is **its own shortest description**. As it turn out, most strings we can think of end up being "random" using this notion of randomness.


At first sight, the idea of thinking of the complexity of an object as the shortest program that can generate it sounds like madness: how is this not dependent on the language we use to describe such program? Wouldn't some languages favor some objects with short descriptions over others? For example empirical languages may favor numerical computations over functional languages. However, as it turns out, this notion of complexity can only change within a constant value when using some language over another language. Furthermore this constant value is independent on the object itself and rather just dependent on the two languages we are considering. How can this be true? More on that later.

In this post we will briefly discuss Kolmogorov complexity, mention some of its basic results (though for the sake of avoiding making this post even longer we will not prove all of them), and conclude with a non-conventional proof of a well-known result which uses some of these ideas in it.


## Minimal Descriptions


In this section we will describe how one reaches the definition of Kolmogorov complexity for a given object $$ x $$. For the sake of keeping things simpler for this post and not assuming any knowledge on Turing Machines and partially recursive functions, we will oversimplify some things and avoid some formalities here and there. So I am deeply sorry if this makes you a bit mad; I'll get you ice-cream some day in return for you bearing with me through this section.


Without the loss of generality, we will consider only as objects of interest binary strings formed with zeros and ones and refer to the set of all possible binary strings, including the empty string, as $$ \{0, 1\}^* $$. This does not break our generality as this is a countably infinite set and may map to any countably infinite set of objects in a one-to-one fashion.

Given some "description" function $$ d(p): \{0, 1\}^* \rightarrow \{0, 1\}^* $$ which maps a binary *description* $$ p $$ of an object $$ x $$ into the corresponding object we are describing (i.e. $$ d(p) = x $$), we define the *Kolmogorov Complexity* $$ C_d(x) $$ of object $$ x $$ with respect to description mechanism $$ d $$ as:

**Definition (Kolmogorov Complexity):** $$ C_d(x) = \min\{\|p\| : d(p) = x \} $$

where $$ \| p \| $$ is used to indicate the length of binary string $$ p $$. If for a given object $$ x $$ no such description $$ p $$ exists, then we will say that the complexity of $$ x $$ is infinite.

Intuitively, we can think of the evaluation of $$ d(p) $$ as "computer" $$ d $$ running "program" $$ p $$ and outputting as a result $$ d(p) $$. In other words, the definition above says that the Kolmogorov complexity of a binary string $$ x $$ is described by the length of the shortest program (or minimal description), in bits, which will generate $$ x $$ as an output using the "programming language" for "computer" $$ d $$.


### Invariance Theorem


While the definition of complexity stated above is useful and interesting by itself, it still has this weird dependency on the "description" function $$ d $$. It would be amazing if we could have some concept of complexity which is only dependent on the intrinsic properties of the object in question and not on the mechanism we use to generate description. This would simply mean that the "programming language" which we use to describe the description $$p$$ may not really affect much the complexity assigned to object $$x$$. It is ok if there is a small dependency on the chosen description mechanism as long as it is independent of the object we are describing itself.

Here is where the magic comes in: it so happens that if we constraint the family of allowed description functions $$ d $$ to be [recursive functions](https://en.wikipedia.org/wiki/%CE%9C-recursive_function) (i.e. functions that can be computed by a [universal Turing Machine](https://en.wikipedia.org/wiki/Turing_machine) or, in layman terms, can be constructed by an algorithm) then we can obtain a sort of "language" independence in descriptions, up to some additive constants that are independent on the object whose complexity we are describing.

Formally what this means is that for all computable functions $$d_1$$ and $$d_2$$, it must be the case that:

$$
C_{d_1}(x) \leq C_{d_2}(x) + c_{d_1, d_2}
$$

where $$ c_{d_1, d_2} $$ is a constant which is only dependent on the two description functions $$ d_1 $$ and $$ d_2 $$ and not on the object $$ x $$ itself. This result is usually referred to as the **invariance theorem**.

The invariance theorem allows us to think of the complexity of a binary string $$ x $$ using a fixed computable description function $$ d_0(p) $$ which represents some "language" in which we will express our programs in. What this implies is that we can define the Kolmogorov complexity $$ C(x) $$ of binary object $$ x $$ as

$$
C(x) = C_{d_0}(x)
$$

by fixing our description method to be some "language" $$ d_0 $$ and have this definition be agnostic of the choice of "programming language" up to some additive constant which is independent on the objects we are encoding.

Take a second to think about this: this means that we have a way to characterize how much information an object "contains" by fixing up a programing language and trying to reason about the shortest program in that language that will generate such an object. If a result holds using this construction, then it will also hold in other languages up to some additive constant. This is fine because we tend to care about asymptotic behavior, in which case additive constants are not an issue.

While I will not formally prove the invariance theorem for the sake of not asking for any background on Turing Machines from the reader, I will attempt to give some intuition as to why this is true. Without any loss of generality, imagine we are working with two possible sets of programs: Python programs and OCaml programs. We will now try and think about the minimal Python program that would generate a fixed string $$ x $$ and see if we can relate the length of this program to the minimal OCaml program that also generates such a string.

Let $$ p_O $$ be a minimal OCaml program which generates string $$ x $$ (i.e. $$ C_{\text{OCaml}}(x) = \| p_O \| $$). Because both of Python and OCaml are "expressive enough" (in formal terms ["Turing Complete"](https://en.wikipedia.org/wiki/Turing_completeness)), it must be a case that we can write a Python program that can run any OCaml program. This would be an OCaml interpreter written in Python. Let $$ I_{P \leftarrow O} $$ be such a interpreter python program.

Using Python program $$ I_{P \leftarrow O} $$ we should be able to run OCaml program $$ p_O $$ and generate object $$ x $$ out of it. All we need to do is store OCaml program $$ p_O $$ as some sort of static data in a "wrapper" Python program $$ W $$ that calls the interpreter $$ I_{P \leftarrow O} $$ internally using $$ p_O $$ as an input and returns the result of the run. The length of Python program $$ W $$ will then be the length of the interpreter program plus the length of the static OCaml program $$ p_O $$ which is stored as data. Because OCaml program $$ p_O $$ generates object $$ x $$, this means that we have constructed a Python program $$ W $$ of length $$ \| I_{P \leftarrow O} \| + \| p_O \| $$ which also generates object $$ x $$.

By the definition of Kolmogorov complexity, such a program $$ W $$ has to be of length greater than or equal to the Kolmogorov complexity of $$ x $$ using Python programs as descriptions. Formally speaking this means:

$$
\begin{align*}
C_{\text{Python}}(x) &\leq \| W \| \\
\Leftrightarrow C_{\text{Python}}(x) &\leq \| I_{P \leftarrow O} \| + \| p_O \| \\
\Leftrightarrow C_{\text{Python}}(x) &\leq C_{\text{OCaml}}(x) + \| I_{P \leftarrow O} \|
\end{align*}
$$

By noticing that the size of $$ \| I_{P \leftarrow O} \| $$ is completely independent of object $$ x $$, you can see that this is basically the invariance theorem described above.

### All Those Random Strings

Finally, I want to introduce a very quick result on the existence of infinitely many strings whose own description is their shortest description (i.e. they are random). Intuitively this means that we will always find strings which cannot be compressed, no matter how clever and which programming language we use. This result will be very useful when trying to use Kolmogorov complexity to actually show some results. 

---

**Theorem:** for every $$ n \in \mathbb{N} $$ there must exist a binary string $$ x $$ with $$ \| x \| = n $$ such that $$ C(x) \geq n $$ (i.e. $$ x $$ is Kolmogorov random)

---

*Proof:*

We proceed with a simple counting argument. For the sake of contradiction, assume that for a given $$ n \in \mathbb{N} $$ there does not exist a binary string $$ x $$ with length $$ n $$ such that $$ C(x) \geq n $$. That is: for all binary strings $$ x $$, we must have that $$ C(x) < n $$. Intuitively what this means is that for all strings $$ x $$ there must be program $$ p_x $$ describing it such that $$ \| p_x \| < n $$ (i.e. there is always some structure in $$ x $$ which allow us to compress it somehow).

However, we only have $$ 2^n - 1$$ programs of length less than $$ n $$ but there are $$ 2^n $$ binary strings of length $$ n $$. By the [pigeonhole principle](https://en.wikipedia.org/wiki/Pigeonhole_principle), this means that two or more **different** binary strings must be described with the same program. This is obviously a contradiction as it would imply that the same program must generate two or more different binary strings as outputs. Therefore we can conclude that our initial assumption is false and the statement we wanted to show must hold.

---

This seemingly simple statement is the heart of a beautiful and useful proof method called the "incompressibility method". So let's try and make some use of it to see how Kolmogorov complexity can be applied in practice.

However, before moving to the next section, all of this has been a lot to take in so here is a kitty picture for you to relax for a bit before moving forward:
![Kitty cat](/assets/images/kitty.png){: .align-center}

Ok, now let's keep going.

## Incompressibility Method

The incompressibility method is a proof method for showing that something holds by considering how a certain description scheme may act on Kolmogorov random strings and reach a contradiction with this result. The key of power of this method is the following: we can show some general property by just considering one and only one object which happens to be incompressible (i.e. its own shortest description). The aim of this is then to show that if an object is incompressible, then some assumptions we are making may end up in an description that is actually shorter than the object itself. This will hence break the incompressibility of the object and will allow us to conclude that the original assumption must be false.

To illustrate this method, below we will present a proof for an old and well-known result. Nonetheless, the richness of this proof is not on the result itself but in the means which we used to reach such conclusion.

### Euclid's Infinite Primes

If you recall from back in our good ol' elementary school days, a prime number is defined as a natural number greater than $$ 1 $$ which is only divisible by itself and $$ 1 $$. It is well known that there are infinitely many primes. Perhaps one of the most known proofs for this, and also the oldest known proof for this fact, is [Euclid's original proof](https://primes.utm.edu/notes/proofs/infinite/euclids.html): an elegant, concise, and very easy to understand proof that is usually given as a first introductory example to [reduction ad absurdum](https://en.wikipedia.org/wiki/Reductio_ad_absurdum) proofs. Nonetheless, it is for sure [not the only proof](https://primes.utm.edu/notes/proofs/infinite/) we have seen for this result.

In this section we will attempt to provide another proof for this statement using the incompressibility method. This proof is based on relaxing some of the ideas used in a beautiful [result](https://books.google.com/books?id=JvXiBwAAQBAJ&lpg=PR5&dq=vitanyi%20Introduction&lr&pg=PA4#v=onepage&q=vitanyi%20Introduction&f=false) obtained by Chaitin (one of the "fathers" of this field of study) on the number of prime numbers below a given number. Nonetheless, after writing this proof, I noticed that [Fortnow](https://people.cs.uchicago.edu/~fortnow/papers/kaikoura.pdf) provides a very similar proof to this one in a survey on Kolmogorov complexity. So it is definitely not a purely novel approach but rather an example to discuss the usefulness of thinking about descriptions and their lengths. Granted, it is not nearly as concise and elegant as Euclid's original proof, but it gives us a taste on how counting arguments with minimal descriptions can be used to prove things in all sorts of areas. So without further ado, here's the proof:

---

**Theorem:** $$ \text{there exist infinitely many prime numbers.} $$

---

*Proof:*

For the sake of contradiction, assume that we have a finite number of primes $$ p_1, p_2, \dots, p_T$$. We will attempt to prove the statement above by constructing some effectively reconstructible description of number using the finiteness of primes. We will then show that this description, while fully generalizable and effectively constructible, will be compact enough to even compress an incompressible (read Kolmogorov random) string. A big no-no which would imply that our initial assumption on the finiteness of primes was wrong.

So with that goal in mind, let's think about how one such description mechanism could be constructed. Assume, without loss of generality, that we want to describe the number $$n \in \mathbb{N}^+$$ using binary strings formed by zeros and ones only. From the [fundamental theorem of arithmetic](https://en.wikipedia.org/wiki/Fundamental_theorem_of_arithmetic), we know that $$ n $$ can be written as a product of powers of primes. This means that we can express $$ n $$ as:

$$
n := p_1^{e_1} p_2^{e_2} p_3^{e_3} \cdots p_T^{e_T}
$$

where $$ e_i \in \mathbb{N} $$ represents the exponent which we will exponentiate the i-th prime in the prime decomposition of $$ n $$. Now notice that for all $$ i $$, we must have that $$ e_i \leq \log_2 n $$. Why? Because if there is at least one prime $$ p_i $$ whose corresponding exponent $$ e_i $$ is greater than $$ \log_2 n$$ then it must be the case that:

$$
\begin{align*}
n = p_1^{e_1} p_2^{e_2} p_3^{e_3} \cdots p_T^{e_T} &\geq p_i^{e_i} \\
&> p_i^{\log_2 n} \\
&\geq p_i^{\log_{p_i} n} = n
\end{align*}
$$

Which is a clear contradiction as $$ n $$ is clearly not more than itself. Note that the last line came from the fact that $$ p_i \geq 2 $$ by definition of a prime number.

What this implies is that we could describe any natural number $$ n $$ by concatenating the binary encodings for all the exponents used in its prime decomposition. Because all of these exponents are less than $$ \log_2 n $$, we would need at most $$ \log_2 \log_2 n $$ binary digits to encode each of the exponents of its prime decomposition. Therefore, we can describe $$ n $$ with a binary string of length $$ T \log_2 \log_2 n $$ by simply concatenating the binary encodings of all of its prime-decomposition exponents.

For example, if we assume we only have $$ T = 3 $$ primes (namely $$ 2 $$, $$ 3 $$, and $$ 5 $$) then the number $$ 360 = 2^3 \cdot 3^2 \cdot 5^1 $$ can be encoded using the string

$$
\color{green}{0011}\color{blue}{0010}\color{red}{0001}
$$

Where different colors are used to make it easier for the reader to distinguish the "blocks" of bits corresponding to each exponent. Note that the size of each "exponent block" is $$ 4 $$ because $$ \lceil \log_2 \log_2 360 \rceil = 4$$.

Now there is a problem with the description above: if I would like to reconstruct the generating number $$ n $$ back from it, I wouldn't know how to do it from the description itself as I do not know size of each "exponent block". This is because the block size is a function of the described number $$ n $$. Something clearly seems to be missing here. What this means is that, for this description to be effectively reconstructed by some algorithm, we need to prefix the description with some extra information about the size of each exponent block.

For this we could do something relatively "fancy" by prefixing our current description with a prefix-free code for $$ \log_2 \log_2 n $$, the effective size of our blocks. However, for the sake of keeping things simpler, we will do it in a rather naive way: we will prefix our current description with as many ones as the number of bits in our blocks followed by a zero, which indicates the start of the exponent blocks. Using this approach, we will require an extra $$ \log_2 \log_2 n + 1 $$ bits for our complete description ($$ (\log_2 \log_2 n) $$ ones plus one $$ 0 $$).

So for example, following our example set above, the final description for $$ 360 $$ if $$ T = 3 $$ will look like this:

$$
\textbf{11110}\color{green}{0011}\color{blue}{0010}\color{red}{0001}
$$

Using our complete description, the total number of bits we will require to describe any positive natural number $$ n $$ using this mechanism, call this number $$ l(n) $$, will be given by:

$$
\begin{align*}
l(n) &:= 1 + \log_2 \log_2 n + T \log_2 \log_2 n \\
&= 1 + (T + 1)\log_2 \log_2 n
\end{align*}
$$

So why would this generate any issues? Well let's take a look at how this description mechanism will handle large positive natural numbers which are Kolmogorov random. From the result discussed above, we know that for all $$ k \in 
\mathbb{N}^+ $$ there must exist some positive natural number $$ m $$ with binary length $$ \|m\| = k $$ which is Kolmogorov random. That means that its Kolmogorov complexity, $$ C(m) $$, is at least as large as the number's own length in bits.

From the invariance theorem, we know that $$ C(m) $$ must be less than or equal to the Kolmogorov complexity of $$ m $$ using the description method defined above, call this complexity $$ C_E(m) $$, plus some constant $$ c_E $$ which is independent of $$ m $$. Furthermore, from the definition of Kolmogorov complexity, it must then be the case that $$ C_E(m) \leq l(m) $$. Putting all of this together, we get:

$$
k \leq C(m) \leq C_E(m) + c_E \leq l(m) + c_E
$$

Note that here we could only use the invariance theorem because our description mechanism is technically speaking a mapping which can be effectively computed: one could write a simple algorithm to turn natural numbers into binary strings using this description mechanism and also recover natural numbers from their description in a unique and deterministic fashion. Think of it as this: if you can write a C program which can generate the source number from its description, then it is a computable function.

Now, expanding $$ l(m) $$ with the length of our encodings we found above, we get:

$$
k \leq 1 + c_E + (T + 1)\log_2 \log_2 m
$$

Because $$ m $$ can be described using $$ k $$ bits only, its must be the case that $$ m \leq 2^{k + 1} $$ (otherwise we would run out of bits). Using this in our expression above we get:

$$
k \leq 1 + c_E + (T + 1)\log_2 (k + 1)
$$

We finish our proof bu noticing that the LHS of this inequality will grow much faster than the RHS of this inequality when looked as functions of $$ k $$. Therefore, for large enough $$ k $$ (i.e. $$ k >> T\cdot c_E $$), it must be the case that this inequality will not longer hold. And because there must be random strings of every length, we must be able to find such a $$ k $$ if we just keep looking for large enough numbers. This means that for large enough $$ k $$ we will be able to compress all random strings... a clear catastrophe in this perfectly ordered world. Therefore, we have reached a contradiction and it must be the case that our initial assumption, that there are only a finite number primes, is false.  $$ \blacksquare $$

## Further Reading

I am planning on making at least one more post on the topic of Kolmogorov complexity as this post served mostly as an introductory survey and barely touched the surface of what this area is capable of. I originally intended to make a short post but as you can probably tell it got really out of hands, so I will provide some more insights on this subject in another post. If in the meantime you want to learn more about it, here are a few references which I found very useful while writing this post:
- [An Introduction to Kolmogorov Complexity and its Applications](https://www.amazon.com/Introduction-Kolmogorov-Complexity-Applications-Computer/dp/0387339981) by Ming Li and Paul Vitányi: it is my understanding that this is the standard textbook for this subject. It is very complete and has a vast number of different sections on applications of Kolmogorov complexity. My only warning is that it may require a strong mathematical background so if you are rusty make sure to go through the entire first chapter on the required background.
- [Kolmogorov Complexity survey](https://people.cs.uchicago.edu/~fortnow/papers/kaikoura.pdf) by Lance Fortnow: useful if you already know something about the subject as it jumps immediately into the results. Still shows a lot of very interesting results in a very concise manner.


---
---

## Appendix

While writing this post, I noticed that there exists a variation of the proof on the infiniteness of prime numbers provided above which could be done without any Kolmogorov complexity knowledge. This variant of the proof instead uses only a counting argument on the number of possible descriptions we will need for describing all numbers below a certain value. Because I did not want to throw this idea out, I leave this alternative proof in here for the curious reader:

*Alternative proof:*

Using our description scheme described in our proof above, we first realize that given a binary string $$ E $$ generated by encoding a positive natural number $$ n $$ with our description mechanism, we can easily and deterministically reconstruct $$ n $$ from $$ E $$ by parsing the start of the description to figure out the block size and then parsing all exponent blocks to figure out the exponents for each prime. Using these exponents and our knowledge of all prime numbers available, we can then obtain the number $$ n $$ back through exponentiation and multiplication.

This means that if $$ E $$ is an description generated by the mechanism described above, then **it can correspond to one an only one** positive natural number $$ n $$. In other words: if a binary string $$ E $$ was indeed generated by our mechanism, then the description function is reversible and we will be able to deterministically generate the generating natural number of such description. This is the crucial thing to remember for this proof.

Now let's consider what happens when we are trying to describe **very very very large** numbers using the description mechanism constructed in the proof above. We start by realizing that the length of our descriptions is an increasing function of $$ n $$. Because logarithms on positive numbers are increasing functions, our formula for $$ l(n) $$ tells us that the larger $$ n $$ is the more bits we will require to describe it. Cool. It makes sense. Now, the "bigger picture" coming from this fact is that we can describe all natural numbers less than some number $$ m $$ using at most $$ l(m) $$ bits.

So how is this useful? Well consider what is the maximum number of bits we would need to "preallocate" to be able to describe any number below some ridiculously large number $$ m >> T $$, say $$ m := 2^{2^{(T+1)^3}} $$ (the rather arbitrary choice of $$ m $$ will be explained later). From our discussion above, we know that no number less than or equal to $$ m $$ will take more than

$$
l\Big(2^{2^{(T+1)^3}}\Big) = 1 + (T + 1)(T + 1)^3 = (T + 1)^4 + 1
$$

bits to be described. However, with that many number of bits we can encode at most

$$
2^{(T + 1)^4 + 1}
$$

objects. The implication of this fact is that all numbers less than $$ m $$ had to be described somehow using at most $$ 2^{(T + 1)^4 + 1} $$ different descriptions. However we note that the following inequality must hold for all $$ T \geq 1 $$:

$$
\big(\text{# of numbers we can describe with } l(m) \text{ bits or less} \big) = 2^{(T + 1)^4 + 1} < 2^{2^{(T+1)^3}} = m
$$

I am skipping the formal proof of this inequality to avoid getting into some tedious calculus, but one can "easily" show this by noticing that the function $$ f(T) := 2^{(T+1)^3} - (T+1)^4 - 1 $$ is increasing and continuous in $$ T \in [1, \infty) $$ (by looking at its derivative) and also positive for $$ T(1) $$, which will imply the result above. So to answer the seriously random choice of $$ m $$ from above: we needed to pick a value of $$ m $$ which was large enough for us to run out of descriptions available but also could make the math rather easy. There are infinitely many such values, though all are functions of $$ T $$, but I am using the one indicated above as it makes some of the math easier.

What this inequality implies is that we do not have enough descriptions available for all numbers below $$ m $$: we simply don't have enough bits. By the [pigeonhole principle](https://en.wikipedia.org/wiki/Pigeonhole_principle), this means that we must have at least two numbers below $$ m $$ which map to the same description. This will then break the fact that we could reconstruct any numbers from their descriptions in a unique and deterministic fashion because now we must have a same "valid" binary string $$ E $$ which somehow maps back to two or more positive natural numbers. Hence we reached a contradiction which means that our initial assumption that there are finitely many prime numbers must be wrong.  $$ \blacksquare $$

