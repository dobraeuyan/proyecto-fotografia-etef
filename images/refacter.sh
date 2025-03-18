#!/bin/bash

QUALITIES=(400:85 800:82 1200:85 2000:95)

CONVERT_CMD="convert"

create_resized_images() {
    local input_file="$1"
    local base_name=$(basename "$input_file" .jpg)
    local base_name=$(basename "$base_name" .jpeg)
    local base_name=$(basename "$base_name" .JPG)
    local base_name=$(basename "$base_name" .JPEG)

    local original_width=$(identify -format "%w" "$input_file")
    local original_height=$(identify -format "%h" "$input_file")

    for quality_setting in "${QUALITIES[@]}"; do
        local width=$(echo "$quality_setting" | cut -d':' -f1)
        local quality=$(echo "$quality_setting" | cut -d':' -f2)

        if [[ "$width" -lt "$original_width" ]]; then
            local output_file="${base_name}-${width}w.webp"

            $CONVERT_CMD "$input_file" \
                -resize "${width}x" \
                -quality "$quality" \
                -strip \
                -define webp:lossless=false \
                -define webp:method=6 \
                -define webp:smart-subsample=true \
                "$output_file"

            echo "Creada: $output_file"
        else
            echo "No se crea ${base_name}-${width}w.webp (la imagen original es más pequeña o igual)"
        fi
    done

     local output_file_original="${base_name}.webp"
      $CONVERT_CMD "$input_file" \
                -quality "$quality" \
                -strip \
                -define webp:lossless=false \
                -define webp:method=6 \
                -define webp:smart-subsample=true \
                "$output_file_original"
      echo "Creada: $output_file_original"
}

if ! command -v $CONVERT_CMD &> /dev/null; then
    echo "Error: ImageMagick no está instalado.  Instálalo (por ejemplo, 'apt install imagemagick' en Debian/Ubuntu)."
    exit 1
fi

find . -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.JPG" -o -iname "*.JPEG" \) | while read -r input_file; do
      create_resized_images "$input_file"
done

echo "Proceso completado."
exit 0
