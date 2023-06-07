# function to add two numbers 
def add(a, b):  
    return a + b

# print add(1, 2)
print(add(1, 2))

# function to find fibonacci series
def fib(n):
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print() # print a new line

# print fib(11)
fib(11)
