import os
import json
import urllib.request

def query_sovereign_node(user_prompt):
    """
    Feeds the decrypted local lectures directly as context into the local Llama 3.2 node.
    """
    lectures_dir = "lectures"
    context_accumulator = ""

    # Automatically scan and pull context from any recovered markdown files
    if os.path.exists(lectures_dir):
        for file_name in sorted(os.listdir(lectures_dir)):
            if file_name.endswith("_recovered.md"):
                file_path = os.path.join(lectures_dir, file_name)
                with open(file_path, "r", encoding="utf-8") as f:
                    context_accumulator += f"\n\n--- Context from {file_name} ---\n" + f.read()

    # Construct the payload with integrated context grounding
    full_prompt = f"{context_accumulator}\n\n[User Query]: {user_prompt}"
    
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "Abad_2036",
        "prompt": full_prompt,
        "stream": False,
        "options": {
            "temperature": 0.75,          # Increases randomness to break repetition
            "repeat_penalty": 1.25,       # Severely punishes repeating identical tokens
            "repeat_last_n": 64,          # Scans the last 64 tokens for loops
            "num_ctx": 4096               # Expands context allocation safely
        }
    }
    
    try:
        req = urllib.request.Request(
            url, 
            data=json.dumps(payload).encode("utf-8"), 
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode("utf-8"))
            print("\n" + "="*60)
            print("📡 [Sovereign Node Response]:")
            print("="*60)
            print(result["response"].strip())
            print("="*60 + "\n")
            
    except Exception as e:
        print(f"[-] Node connection error: {str(e)}")
        print("[-] Ensure your local Ollama daemon is running in the background.")

if __name__ == "__main__":
    print("[+] Sovereign Context Agent Active.")
    query = input("[?] Enter your analytical prompt for the AI node: ")
    query_sovereign_node(query)