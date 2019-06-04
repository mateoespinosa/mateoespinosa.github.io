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
toc_sticky: true
toc_label: Dat Table of Contents
header:
  teaser: https://upload.wikimedia.org/wikipedia/commons/d/d4/Mandelpart2_red.png
---

## Introduction

[Andrey Kolmogorov](https://en.wikipedia.org/wiki/Andrey_Kolmogorov) is far from being an unknown name in most fields of intellectual inquiry. Mostly known for establishing the foundations of probability theory (the unforgettable [Kolmogorov Axioms](https://en.wikipedia.org/wiki/Probability_axioms)), the list of things named after him is quite astonishing: [Kolmogorov space](https://en.wikipedia.org/wiki/Kolmogorov_space), [Kolmogorov equations](https://en.wikipedia.org/wiki/Kolmogorov_equations), [Kolmogorov Integral](https://en.wikipedia.org/wiki/Kolmogorov_integral), [Kolmogorov-Smirnov test](https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test), and so many more. This stands in a blunt contrast with the little we tend to hear about Kolmogorov and his life compared to other mathematicians/scientists of this same "caliber" (just look at how relatively short his Wikipedia biography is). Because of this, I wanted to spend some time discussing a topic which unfortunately usually escapes most undergraduate mathematics/computer science curricula: Kolmogorv Complexity.

This is a fascinating topic lying on the intersection of theory of computation, information theory, and probability theory. Its aim is a simple, yet astonishingly rich, one: to formalize the notion of describing how "complex" a given object is through a mechanism that depends only on the intrinsic properties of the object itself. And its applications are countless:

## History
Kolmogorv Complexity is a fascinating branch of algorithmic information theory with a rather long history of developments.
TODO: look at history from textbook.

which started with a 1963 paper properly titled ["On tables of random numbers"](https://core.ac.uk/download/pdf/81156038.pdf). The title is not too catchy for sure, but  the result is quite interesting: Kolmogorov discusses the possibility of formally describing how "simple" a sampling algorithm for generating subsets of large populations really is. The goal of such a characterization for an algorithm is to understand when could one expect a probabilistic property to hold both in a large group and also in a subgroup selected with an algorithm. With this description of the complexity of a selection algorithm, Kolmogorov argues that one would expect a probabilistic property found in a "sufficiently large" group to hold in a subset of this same group as long as the way we select this subgroup is "simple enough" using his new metric. (TODO: REWRITE THESE LAST TO SENTENCES... TO HARD TO UNDERSTAND. MAYBE BRING UP AN EXAMPLE)

## Minimal Descriptions

TODO:
- Briefly describe what we mean with minimal descriptions. Give a few examples with python programs.
- Make it clear that descriptions are intrinsic to the object in mind and not to the description mechanism.
- Describe how binary strings are naturally good ways of encoding things.
-

## Incompressibility Method

TODO
- Describe the concept of random strings.
- Give some intuition as to why this corresponds to "randomness" by giving some examples.

### Gödel's Incompleteness Theorem
TODO
- Bring some really brief background on this explaining how this may be a full post in the future.
    + Mention Turing, Church, and how Godel obtained this result.

#### Proof Systems

TODO

- Bring up just enough background to discuss Godel's incompleteness theorem
    + What a proof system is
    + What is consistency
    + What is soundness
    + Why this matters?

#### Compressing a Proof System: an alternative view of the theorem

TODO
- Mention how there must exist at least one random string for each given length --> Come out with counting argument for this (pigeonhole?)
- Use this to show that a proof system that can find a proof for the randomness of a string with very large number of bits (many more than the encoding of the whole proof system itself)
- Bring up some of the weirdness that one must get him/herself used to when dealing with this. How can this make real formal sense?

### Euclid's Infinite Primes
If you recall from back in our good ol' days, a prime number is "usually" defined as a natural number greater than `1` which is only divisible by itself and 1. It is well known that there are infinitely many primes. Perhaps one of the most known proofs for this is [Euclid's original proof](https://primes.utm.edu/notes/proofs/infinite/euclids.html): an elegant, concise, and very easy to understand proof that is usually given as a first introductory example to [reduction ad absurdum](https://en.wikipedia.org/wiki/Reductio_ad_absurdum) proofs. Nonetheless, it is for sure not the only proof we have seen for this result ([here](https://primes.utm.edu/notes/proofs/infinite/) are a few others). In this section we will attempt to provide another proof for this statement using the incompressibility method. This proof is based on relaxing some of the ideas used in a beautiful [result](TODO: CITE HERE) obtained by Chaitin on the number of prime numbers below a given number. So definitely not purely novel but rather an example to discuss the usefulness of thinking about encodings and their lengths. Granted is not nearly as concise and elegant as Euclid's original proof, but it gives us a taste on how counting arguments with encodings can be used to prove things in all sorts of areas. So without further ado, here's the proof:


**Theorem:** $$ \text{There are infinitely many primes.} $$

*Proof:*

For the sake of contradiction, assume that we have a finite number of primes $$ p_1, p_2, \dots, p_T$$. We will attempt to prove the statement above by constructing some effectively reconstructible encoding of number using the finiteness of primes. We will then show that this encoding, while fully generalizable and effectively constructible, would "run short" of different encodings for large enough numbers and will have to start using the same encoding for two different numbers. This would contradict the fact that this encoding was reconstructible in the first place. A big no-no which would imply that our initial assumption on the finiteness of primes was wrong.

So with that goal in mind, let's think about how one such encoding could be constructed. Assume, without loss of generality, that we want to encode the number $$n \in \mathbb{N}$$ using binary strings formed by zeros and ones only. From the [fundamental theorem of arithmetic](https://en.wikipedia.org/wiki/Fundamental_theorem_of_arithmetic), we know that $$ n $$ can be written as a product of powers of primes. This means that we can express $$ n $$ as:

$$
n := p_1^{e_1} p_2^{e_2} p_3^{e_3} \cdots p_T^{e_T}
$$

Where $$ e_i \in \mathbb{N} $$ represents the exponent which we will exponentiate the i-th prime in the prime decomposition of $$ n $$. Now notice that for all $$ i $$, it must be the case that $$ e_i \leq \log_2 n $$. Why? Because if there is at least one prime $$ p_i $$ whose corresponding exponent $$ e_i $$ is greater than $$ \log_2 n$$ then it must be the case that:

$$
\begin{align*}
n = p_1^{e_1} p_2^{e_2} p_3^{e_3} \cdots p_T^{e_T} &\geq p_i^{e_i} \\
&> p_i^{\log_2 n} \\
&\geq p_i^{\log_{p_i} n} = n
\end{align*}
$$

Which is a clear contradiction as $$ n $$ is clearly not more than itself. Note that the last line came from the fact that $$ p_i \geq 2 $$ by definition of a prime number.

So this means that we could encode any natural number $$ n $$ by concatenating the binary encodings for all the exponents used in its prime decomposition. Because all of these exponents are less than $$ \log_2 n $$, this means that we need at most $$ \log_2 \log_2 n $$ binary digits to encode each of the exponents of its prime decomposition. Therefore, we can encode $$ n $$ with a binary string of length $$ T \log_2 \log_2 n $$ by simply concatenating the binary encodings of all of its prime-decomposition exponents.

For example, if we assume we only have $$ T = 3 $$ primes (namely $$ 2 $$, $$ 3 $$, and $$ 5 $$) then the number $$ 360 = 2^3 \cdot 3^2 \cdot 5^1 $$ can be encoded using the string

$$
\color{green}{0011}\color{blue}{0010}\color{red}{0001}
$$

Where different colors are used to make it easier for the reader to distinguish the "blocks" of bits corresponding to each exponent. Note that the size of each "exponent block" is $$ 4 $$ because $$ \lceil \log_2 \log_2 360 \rceil = 4$$.

Now there is a problem with the encoding above: if I would like to reconstruct it and regenerate the number $$ n $$ back from it, I wouldn't know how to do it from the encoding itself as I do not know size of each "exponent block". This is because the block size is a function of the encoded number itself. This means that for this encoding to be effectively reconstructed, i.e. a dumb algorithm can do it without any extra guidance but the input encoding, we need to prefix it with some extra information about the size of each exponent block. For this we could do something relatively "fancy" by prefixing our current encoding with a prefix-free code for $$ \log_2 \log_2 n $$, the effective size of our blocks, but for the sake of keeping things simpler we will do it in a rather naive way: we will prefix our current encoding with as many ones as the number of bits in our blocks followed by a zero, which indicates the start of the exponent blocks. Using this approach, we will require an extra $$ \log_2 \log_2 n + 1 $$ bits for our complete encoding.

Following our example above, the final encoding for $$ 360 $$ if $$ T = 3 $$ will look like this:

$$
\textbf{11110}\color{green}{0011}\color{blue}{0010}\color{red}{0001}
$$

Therefore the total number of bits we will require to encode any natural number $$ n $$ using our encoding scheme, call this $$ l(n) $$, will be given by:

$$
\begin{align*}
l(n) &:= 1 + \log_2 \log_2 n + T \log_2 \log_2 n \\
& = 1 + (T + 1)\log_2 \log_2 n
\end{align*}
$$

Now there are a few important things to notice about this encoding:
1. It can be effectively and quite easily performed by an algorithm (i.e. it is effectively computable).
2. From the fundamental theorem of arithmetic we know that this encoding must be well defined for all natural numbers. Therefore it is a well defined mapping between the set of natural numbers and a subset of the set of all possible binary strings (not all binary strings would correspond to "valid" encodings).
3. Given a binary string $$ E $$ generated by encoding a natural number $$ n $$ using the scheme defined above, we can easily and deterministically reconstruct $$ n $$ from $$ E $$ by parsing the start of the encoding to figure out the block size and then parse all exponent blocks to figure out the exponents for each prime. This means that if $$ E $$ is an encoding generated by the mechanism described above, then it can correspond to one an only one natural number $$ n $$. In other words: if a binary string $$ E $$ was indeed generated by our mechanism, then the encoding function is reversible and will be able to deterministically generate the generating natural number of such encoding.

So why would this generate any issues? Well let's consider what happens when we are trying to encode **very very very large** numbers. We start by realizing that the length of our encodings is an increasing function of $$ n $$. This means that we can encode all natural numbers less than some number $$ m $$ using at most $$ l(m) $$ bits. Therefore, we can encode all numbers below some ridiculously large number $$ m >> T $$, say $$ m := 2^{2^{(T+1)^3}} $$ (the rather arbitrary choice of $$ m $$ will be explained later), using at most

$$
l\Big(2^{2^{(T+1)^3}}\Big) = 1 + (T + 1)(T + 1)^3 = (T + 1)^4 + 1
$$

bits. However, with that many number of bits we can encode at most

$$
2^{(T + 1)^4 + 1}
$$

objects. The implication of this fact is that all numbers less than $$ m $$ had to be encoded using at most $$ 2^{(T + 1)^4 + 1} $$ different encodings. However we note that the following inequality must hold for all $$ T \geq 1 $$:

$$
\big(\text{# of numbers we can encode with } l(m) \text{ bits} \big) = 2^{(T + 1)^4 + 1} < 2^{2^{(T+1)^3}} = m
$$

I am skipping the formal proof of this inequality to avoid getting into some tedious calculus, but one can "easily" show this by noticing that the function $$ f(T) := 2^{(T+1)^3} - (T+1)^4 - 1 $$ is increasing and continuous in $$ T \in [1, \infty) $$ (by looking at its derivative) and also positive for $$ T(1) $$, which will imply the result above. So to answer the seriously random choice of $$ m $$ from above: we needed to pick a value of $$ m $$ which was large enough for us to run out of encodings but also could make the math rather easy. There are infinitely many such values, though all are functions of $$ T $$, but I am using the one indicated above as it makes some of the math easier.

What this inequality implies is that we simple do not have enough encodings available for all numbers below $$ m $$. By the [pigeonhole principle](TODO: CITE HERE), this means that we must have at least two numbers below $$ m $$ which map to the same encoding. This will then break the fact that we could reconstruct encoded numbers from their encodings in a unique and deterministic fashion because now the same encoding has to somehow map to two or more numbers. Hence we reached a contradiction which means that our initial assumption that there are infinitely many prime numbers must be wrong.


## Further Reading

TODO
- An Introduction to Kolmogorov Complexity and its Applications