"""Build both website demos using the original course's demo builder.

Usage: python -B scripts/build-demo.py "path/to/Curso/_src"
The source folder stays untouched; generated demos are written into public/.
"""

import argparse
from pathlib import Path
import subprocess
import sys


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="Course _src directory containing build_demo.py")
    args = parser.parse_args()
    source = args.source.resolve()
    if not (source / "build_demo.py").is_file():
        parser.error("The source directory must contain build_demo.py")

    root = Path(__file__).resolve().parents[1]
    sys.dont_write_bytecode = True
    sys.path.insert(0, str(source))
    import build_demo

    build_demo.OUT = str(root / "public/projects/diversidad-equidad-inclusion/demo.html")
    build_demo.main()
    subprocess.run(["node", "scripts/translate-demo.mjs"], cwd=root, check=True)


if __name__ == "__main__":
    main()
