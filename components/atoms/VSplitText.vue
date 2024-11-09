<script lang="ts">
import type { PropType } from 'vue'
import type { SplitText } from '~/utils/split-text'

// Find why this component isn't render in SSR
export default defineComponent({
    props: {
        content: { type: [String, null, undefined], required: true },
        rawSRR: Boolean,
        render: String as PropType<'all' | 'lines' | 'words' | 'chars'>,
    },
    setup(props) {
        const splitTextData = splitText(props.content)

        function renderLine(line: SplitText['all'][0]) {
            return line.content.map((word) => {
                return h('div', { 'data-word-index': word.index },
                    word.content.map((char) => {
                        return h('span', { 'data-char-index': char.index },
                            char.content)
                    }))
            })
        }

        return () => {
            if (props.render === 'chars') {
                return splitTextData.characters.map((char, i) => {
                    return h('span', { 'data-char-index': i }, char)
                })
            }
            else if (props.render === 'words') {
                return splitTextData.words.map((word, i) => {
                    return h('span', { 'data-word-index': i }, word)
                })
            }
            else if (props.render === 'lines') {
                return splitTextData.lines.map((line, i) => {
                    return h('div', { 'data-line-index': i }, line)
                })
            }
            else {
                const lines = splitTextData.all
                return lines?.length > 0 ? lines.map(line => renderLine(line)) : renderLine(lines[0])
            }
        }
    },
})
</script>
