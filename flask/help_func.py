def valid(dic,value):
    if type(dic).__name__ == "dict" and value in dic:
        return dic.get(value)
    return False