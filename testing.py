
import re

def sort_hashmap_by_value():
    """Sorts a hashmap (dictionary) entered by the user by its values."""
    while True:
        try:
            user_input = input().strip()
            if not user_input:
                print("Input cannot be empty. Please try again.")
                continue
            if re.match(
                r"^\{(\s*[a-zA-Z0-9_]+\s*=\s*[a-zA-Z\s]+,?)+\}$", user_input
            ):
                input_dict = parse_example_format(user_input)
            else:
                print("Invalid format. Please enter in the format {key=value, key=value}.")
                continue
            sorted_dict = dict(sorted(input_dict.items(), key=lambda item: item[1]))
            print(f" {sorted_dict}")
            return sorted_dict

        except ValueError as e:
            print(f"Error: {e}. Please enter a valid hashmap.")
        except KeyboardInterrupt:
            print("\nInput cancelled by user.")
            return None
        except EOFError:
            print("\nUnexpected EOF. Exiting program.")
            return None

def parse_example_format(example_input):
    """Parses the input format {key=value, key=value} into a dictionary."""
    try:
        content = example_input.strip()[1:-1]
        pairs = re.findall(r"([a-zA-Z0-9_]+)\s*=\s*([a-zA-Z\s]+)", content)
        parsed_dict = {key: value for key, value in pairs}
        return parsed_dict
    except Exception as e:
        raise ValueError(f"Error parsing input format: {e}")

if __name__ == "__main__":
    sort_hashmap_by_value()
