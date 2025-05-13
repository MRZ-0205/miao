  class LinkedList {
    head = null;
    tail = null;
    #size = 0;
  
    at(idx) {
      if (idx < 0 || idx >= this.#size) {
        return undefined
      }
    
      let p = this.head
    
      while (idx > 0) {
        p = p.next
      }
    
      return p.val
    }
  
    append(val) {
      const node = { val: val, next: null }
    
      if (this.head === null) {
        this.head = this.tail = node
      } else {
        this.tail.next = node
        this.tail = node
      }
      this.#size++
    }
  
    prepend(val) {
      const node = { val: val, next: null }
    
      if (this.head === null) {
        this.head = this.tail = node
      } else {
        node.next = this.head
        this.head = node
      }
      this.#size++
    }
  
    get size() {
      return this.#size
    }
  }

  class Vector {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    plus(v) {
      const x = this.x + v.x
      const y = this.y + v.y
      return new Vector(x, y)
    }

    minus(v) {
      const x = this.x - v.x
      const y = this.y - v.y
      return new Vector(x, y)
    }

    get length() {
      return Math.sqrt(this.x ** 2 + this.y ** 2)
    }
  }

  class Complex {
    #real
    #imag

    constructor(real, imag) {
      this.#real = real
      this.#imag = imag
    }

    get real() {
      return this.#real
    }

    get imag() {
      return this.#imag
    }

    plus(c) {
      const real = this.real + c.real
      const imag = this.imag + c.imag
      return new Complex(real, imag)
    }

    minus(c) {
      const real = this.real - c.real
      const imag = this.imag - c.imag
      return new Complex(real, imag)
    }

    mul(c) {
      const real = this.real * c.real - this.imag * c.imag
      const imag = this.real * c.imag + this.imag * c.real
      return new Complex(real, imag)
    }

    div(c) {
      const real = (this.real * c.real + this.imag * c.imag) / (c.real ** 2 + c.imag ** 2)
      const imag = (this.imag * c.real - this.real * c.imag) / (c.real ** 2 + c.imag ** 2)
      return new Complex(real, imag)
    }

    toString() {
      return '(' + this.real + (this.imag >= 0 ? '+' : '') + this.imag + 'i)'
    }
  }

  class ArrayList {
    #capacity; #vals; #length

    constructor(initialCapacity = 8) {
      this.#capacity = Math.max(initialCapacity, 0)
      this.#vals = new Array(this.#capacity)
      this.#length = 0
    }

    at(idx) {
      if (0 <= idx && idx < this.#length) {
        return this.#vals[idx]
      } else if (-this.#length <= idx && idx < 0) {
        return this.#vals[idx + this.#length]
      } else {
        return undefined
      }
    }

    push(val) {
      if (this.#length === this.#capacity) {
        this.#capacity *= Math.max(this.#capacity * 2, 1)
        const newVals = new Array(this.#capacity)
        for (let i = 0; i < this.#length; i++) {
          newVals[i] = this.#vals[i]
        }
        this.#vals = newVals
      }

      this.#vals[this.#length++] = val
      return this.#length
    }

    pop() {
      if (this.#length === 0) {
        return undefined
      }

      const val = this.#vals[--this.#length]
      this.#vals[this.#length] = undefined

      if (this.#length < this.#capacity / 4 && this.#capacity >= 16) {
        this.#capacity = Math.floor(this.#capacity / 2)
        const newVals = new Array(this.#capacity)
        for (let i = 0; i < this.#length; i++) {
          newVals[i] = this.#vals[i]
        }
        this.#vals = newVals
      }

      return val
    }

    get length() {
      return this.#length
    }

    set length(newLength) {
      if (0 <= newLength && newLength < this.#length) {
        for (let i = newLength; i < this.#length; i++) {
          this.#vals[i] = undefined
        }
        this.#length = Math.max(newLength, 0)
      }
    }
  }

  class Stack {
    #vals; #size;

    constructor() {
      this.#vals = []
      this.#size = 0
    }
    
    push(val) {
      this.#vals[this.#size] = val
      this.#size++
    }

    pop() {
      if (this.#size === 0) {
        return undefined
      }
      const val = this.#vals[--this.#size]
      this.#vals[this.#size] = undefined
      return val
    }

    get size() {
      return this.#size
    }
  }

  class Queue {
    #head; #tail; #size;

    constructor() {
      this.#head = null
      this.#tail = null
      this.#size = 0
    }

    add(val) {
      const node = { val: val, next: null }

      if (this.#size === 0) {
        this.#head = this.#tail = node
      } else {
        this.#tail.next = node
        this.#tail = node
      }

      this.#size++
      return this
    }

    pop() {
      if (this.#size === 0) {
        return undefined
      }

      const val = this.#head.val

      if (this.#size === 1) {
        this.#head = this.#tail = null
      } else {
        this.#head = this.#head.next
      }

      this.#size--      
      return val
    }

    peek() {
      if (this.#size === 0) {
        return undefined
      }
      return this.#head.val
    }

    get size() {
      return this.#size
    }
  }

  class MySet {
    #elements; #size

    constructor() {
      this.#elements = []
      this.#size = 0
    }

    add(val) {
      if (!this.has(val)) {
        this.#elements.push(val)
        this.#size++
      }

      return this
    }

    has(val) {
      for (let i = 0; i < this.#size; i++) {
        if (this.#elements[i] === val) {
          return true
        }
      }
      return false
    }

    delete(val) {
      for (let i = 0; i < this.#size; i++) {
        if (this.#elements[i] === val) {
          this.#elements.splice(i, 1)
          this.#size--
          break
        }
      }

      return this
    }

    clear() {
      this.#elements.length = 0
      this.#size = 0
      return this
    }

    get size() {
      return this.#size
    }
  }

  class MyMap {
    #keys; #vals; #size;

    constructor() {
      this.#keys = []
      this.#vals = []
      this.#size = 0
    }

    set(key, val) {  
      for (let i = 0; i < this.#size; i++) {
        if (this.#keys[i] === key) {
          this.#vals[i] = val
          return this
        } 
      }
      this.#keys.push(key)
      this.#vals.push(val)
      this.#size++
      return this
    }

    get(key) {
      for (let i = 0; i < this.#size; i++) {
        if (this.#keys[i] === key) {         
          return this.#vals[i]
        } 
      }
      return undefined
    }

    has(key) {
      for (let i = 0; i < this.#size; i++) {
        if (this.#keys[i] === key) {
          return true
        }        
      }
      return false
    }

    delete(key) {
      for (let i = 0; i < this.#size; i++) {
        if (this.#keys[i] === key) {
          this.#keys.splice(i, 1)
          this.#vals.splice(i, 1)
          this.#size--
          return true
        }
      }
      return false
    }

    clear() {
      this.#keys.length = 0
      this.#vals.length = 0
      this.#size = 0
    }

    get size() {
      return this.#size
    }
  }