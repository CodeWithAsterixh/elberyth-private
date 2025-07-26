import {ListItemBuilder, StructureBuilder} from 'sanity/structure'

export const deskItemBuilder = (
  S: StructureBuilder,
  {
    docTitle,
    filterField,
    filterId,
    schemaType,
  }: {
    docTitle: string
    schemaType: string
    filterField: string
    filterId: string
  },
) => {
  return {
    builder: S.listItem()
      .id(`filtered-${schemaType}-${filterId}`)
      .title(docTitle)
      .schemaType(schemaType)
      .child(
        S.documentList()

          .title(docTitle)
          .filter(`_type == "${schemaType}" && ${filterField} == "${filterId}"`),
      ),
    usedSchema: schemaType,
  }
}
export type GroupDefinition = {
  title: string
  schemaTypes: string[]
  builders: (S: StructureBuilder) => {builder: ListItemBuilder; usedSchema: string}[]
}

export const deskStructure = (groups: GroupDefinition[]) => (S: StructureBuilder) => {
  // Flatten all schema types used in groups
  const allUsedSchemaTypes = groups.flatMap((group) => group.schemaTypes)

  return S.list()
    .title('Content')
    .items([
      // Grouped lists
      ...groups.map(({title, builders, schemaTypes}) => {
        const buildersList = builders(S)
          .map((bd) => {
            const hasSchema = schemaTypes.includes(bd.usedSchema)

            if (!hasSchema) return
            return bd
          })
          .filter((bs) => bs !== undefined)
        const unBuiltTypes = schemaTypes.filter(
          (st) => !buildersList.find((b) => b.usedSchema !== st),
        )
        return S.listItem()
          .title(title)
          .child(
            S.list()
              .title(title)
              .items([
                ...buildersList.map((b) => b.builder),
                ...S.documentTypeListItems().filter((item) =>
                  unBuiltTypes.includes(item.getId() || ''),
                ),
              ]),
          )
      }),

      S.divider(),

      // "Others" — all unused schema types
      S.listItem()
        .title('Others')
        .child(
          S.list()
            .title('Others')
            .items(
              S.documentTypeListItems().filter(
                (item) => !allUsedSchemaTypes.includes(item.getId() || ''),
              ),
            ),
        ),
    ])
}
