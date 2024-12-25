// app/api/chat/route.js

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  const { message } = await request.json();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured.' }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: `You: Hi! Can you help me with both general questions and coding tasks?
Chatbot: Of course! I’m here to chat and solve coding problems. 😊 Ask me anything!

You: What's your favorite programming language?
Chatbot: I like them all, but Python has a special place in my heart! 🐍

You: Can you tell me a joke?
Chatbot: Sure! Why did the programmer quit his job? Because he didn’t get arrays! 😄

You: Write a Python function to check if a number is prime.
Chatbot: Sure! Here's a function for that:

python
def is_prime(n):
    # Check for numbers less than 2
    if n < 2:
        return False
    # Check divisors from 2 to sqrt(n)
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

# This function checks if a number is prime by iterating through possible divisors up to the square root of the number.
# If no divisors are found, the number is prime.
You: Can you write a function to reverse a string in Python?
Chatbot: Absolutely! Here’s how you can do it:

python
def reverse_string(s):
    # Using slicing to reverse the string
    return s[::-1]

# This function uses Python slicing to reverse the input string. It starts at the end and steps backward to the beginning.
Instructions for the Chatbot
If the question is conversational, respond in a friendly and concise tone. Use emojis where appropriate to keep the conversation light and engaging.
If the question is related to coding, provide a short and efficient code snippet. Follow it with a simple explanation of the code logic.`,
  });

  const generationConfig = {
    temperature: 0.75,
    topP: 0.75,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            { text: "fibonacci sequence in java" },
          ],
        },
        {
          role: "model",
          parts: [
            { text: "Okay, here's a Java function to generate the Fibonacci sequence up to a given number of terms:\n\n```java\npublic class Fibonacci {\n\n    public static void printFibonacciSequence(int n) {\n        int a = 0, b = 1;\n        System.out.print(\"Fibonacci Sequence up to \" + n + \" terms: \");\n\n        for (int i = 0; i < n; i++) {\n            System.out.print(a + \" \");\n            int next = a + b;\n            a = b;\n            b = next;\n        }\n        System.out.println();\n    }\n\n    public static void main(String[] args) {\n        printFibonacciSequence(10); // Example to print the first 10 Fibonacci numbers\n    }\n}\n```\n\n**Explanation:**\n\n1.  **Initialization:** We start with `a = 0` and `b = 1`, which are the first two numbers in the Fibonacci sequence.\n2.  **Loop:** We use a `for` loop to generate the sequence up to `n` terms.\n3.  **Print and Update:** Inside the loop, we print the current value of `a`, and then update the values of `a` and `b` to continue the sequence (`next` is computed, `a` becomes `b`, and `b` becomes `next`).\n4. **Main method** The main method is used to call the `printFibonacciSequence` function to print the sequence.\n\nThis code will print the Fibonacci sequence up to the number of terms you specify. Let me know if you need any modifications or have more questions! 😊\n" },
          ],
        },
        {
          role: "user",
          parts: [
            { text: "2 sum " },
          ],
        },
        {
          role: "model",
          parts: [
            { text: "Alright, let's tackle the \"2 Sum\" problem. Here's a Python function that efficiently finds two numbers in a list that add up to a target value:\n\n```python\ndef two_sum(nums, target):\n    seen = {}  # Dictionary to store numbers and their indices\n\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]  # Return indices if complement is found\n        seen[num] = i  # Store current number and its index\n\n    return None  # Return None if no such pair is found\n\n# Example usage:\nnumbers = [2, 7, 11, 15]\ntarget_sum = 9\nresult = two_sum(numbers, target_sum)\nprint(result) # Output: [0, 1]\n```\n\n**Explanation:**\n\n1.  **Hash Map (Dictionary):** We use a dictionary called `seen` to store each number encountered in the list along with its index. This allows for quick lookups.\n2.  **Iteration:** We iterate through the list using `enumerate` to get both the index and the value of each number.\n3.  **Complement Check:** For each number, we calculate its `complement` (the value needed to reach the `target`).\n4.  **Lookup:** We check if the `complement` is already in the `seen` dictionary. If it is, we've found our pair, and we return the indices of the `complement` and the current number.\n5.  **Store Number:** If the `complement` is not found, we store the current number and its index in the `seen` dictionary.\n6.  **No Pair:** If the loop finishes without finding a pair, we return `None`.\n\nThis approach has a time complexity of O(n), making it quite efficient. Let me know if you have any other questions or would like to explore different approaches! 🚀\n" },
          ],
        },
        {
          role: "user",
          parts: [
            { text: "3 sum" },
          ],
        },
        {
          role: "model",
          parts: [
            { text: "Okay, let's dive into the \"3 Sum\" problem. This one is a bit more complex than \"2 Sum,\" but here's a Python function that solves it efficiently:\n\n```python\ndef three_sum(nums):\n    nums.sort()  # Sort the array to handle duplicates and use two-pointer approach\n    result = []\n    n = len(nums)\n\n    for i in range(n - 2):\n        # Skip duplicate numbers for the first element\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n\n        left, right = i + 1, n - 1  # Initialize two pointers\n\n        while left < right:\n            current_sum = nums[i] + nums[left] + nums[right]\n\n            if current_sum == 0:\n                result.append([nums[i], nums[left], nums[right]])\n                # Skip duplicates for the second and third elements\n                while left < right and nums[left] == nums[left + 1]:\n                    left += 1\n                while left < right and nums[right] == nums[right - 1]:\n                    right -= 1\n                left += 1\n                right -= 1\n            elif current_sum < 0:\n                left += 1\n            else:\n                right -= 1\n\n    return result\n\n# Example usage:\nnumbers = [-1, 0, 1, 2, -1, -4]\nresult = three_sum(numbers)\nprint(result)  # Output: [[-1, -1, 2], [-1, 0, 1]]\n```\n\n**Explanation:**\n\n1.  **Sorting:** We start by sorting the input list. This helps in handling duplicates and makes the two-pointer approach possible.\n2.  **Outer Loop:** We iterate through the list with an outer loop, fixing one element at a time.\n3.  **Duplicate Handling (Outer):** We skip duplicate numbers for the first element to avoid duplicate triplets in the result.\n4.  **Two Pointers:** We use two pointers, `left` and `right`, to find the other two numbers that sum up to the negative of the fixed number.\n5.  **Sum Calculation:** We calculate the `current_sum` using the fixed number and the numbers pointed to by `left` and `right`.\n6.  **Target Match:**\n    *   If `current_sum` is 0, we found a triplet. We add it to the `result` list and move the pointers to skip duplicates.\n    *   If `current_sum` is less than 0, we need a larger sum, so we move the `left` pointer to the right.\n    *   If `current_sum` is greater than 0, we need a smaller sum, so we move the `right` pointer to the left.\n7.  **Duplicate Handling (Inner):** We skip duplicates for the second and third elements to avoid duplicate triplets in the result.\n8.  **Return Result:** Finally, we return the list of unique triplets.\n\nThis approach has a time complexity of O(n^2) due to the nested loops, which is a significant improvement over a naive O(n^3) approach. Let me know if you have any other questions or want to explore other solutions! 🧐\n" },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(message);
    return NextResponse.json({ reply: result.response.text() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
