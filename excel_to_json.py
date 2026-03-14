import pandas as pd

def excel_to_js(excel_path, js_path, sheet_name=0):
    df = pd.read_excel(excel_path, sheet_name=sheet_name)

    # kolumny które zawsze mają być tablicą
    array_columns = ["country", "engcountry"]

    # NaN -> None
    df = df.where(pd.notna(df), None)

    # kolumny które zawsze są tablicą
    for col in array_columns:
        if col in df.columns:
            df[col] = df[col].apply(
                lambda x: None if x is None else [v.strip() for v in str(x).split(",")]
            )

    # inne kolumny – tylko jeśli jest przecinek
    other_cols = [c for c in df.columns if c not in array_columns]

    for col in other_cols:
        mask = df[col].astype(str).str.contains(",", na=False)

        df.loc[mask, col] = df.loc[mask, col].apply(
            lambda x: [v.strip() for v in str(x).split(",")]
        )

    json_str = df.to_json(
        orient="records",
        force_ascii=False,
        indent=4
    )

    with open(js_path, "w", encoding="utf-8") as f:
        f.write(f"var data = {json_str};")

    print(f"✅ Zapisano dane do pliku JS: {js_path}")


if __name__ == "__main__":
    excel_to_js("dane.xlsx", "dane.js")