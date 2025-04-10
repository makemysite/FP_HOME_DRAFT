export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_faqs: {
        Row: {
          answer: string
          blog_post_id: string
          created_at: string
          id: string
          position: number
          question: string
        }
        Insert: {
          answer: string
          blog_post_id: string
          created_at?: string
          id?: string
          position: number
          question: string
        }
        Update: {
          answer?: string
          blog_post_id?: string
          created_at?: string
          id?: string
          position?: number
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_faqs_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          category: Database["public"]["Enums"]["blog_category"] | null
          conclusion: string | null
          created_at: string
          description: string | null
          hero_image: string | null
          id: string
          label: Database["public"]["Enums"]["blog_label"] | null
          meta_description: string | null
          meta_title: string | null
          published: boolean
          slug: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["blog_category"] | null
          conclusion?: string | null
          created_at?: string
          description?: string | null
          hero_image?: string | null
          id?: string
          label?: Database["public"]["Enums"]["blog_label"] | null
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          slug: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["blog_category"] | null
          conclusion?: string | null
          created_at?: string
          description?: string | null
          hero_image?: string | null
          id?: string
          label?: Database["public"]["Enums"]["blog_label"] | null
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          slug?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      blog_sections: {
        Row: {
          blog_post_id: string
          created_at: string
          id: string
          position: number
          title: string
        }
        Insert: {
          blog_post_id: string
          created_at?: string
          id?: string
          position: number
          title: string
        }
        Update: {
          blog_post_id?: string
          created_at?: string
          id?: string
          position?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_sections_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_requests: {
        Row: {
          calendly_redirect_status: boolean | null
          created_at: string
          email: string
          id: string
        }
        Insert: {
          calendly_redirect_status?: boolean | null
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          calendly_redirect_status?: boolean | null
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      section_content: {
        Row: {
          content: Json
          created_at: string
          id: string
          position: number
          section_id: string
          type: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          position: number
          section_id: string
          type: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          position?: number
          section_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "section_content_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "blog_sections"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      blog_category:
        | "Industry Insights"
        | "Field Operations"
        | "Technology Trends"
        | "Growth"
      blog_label: "latest" | "popular" | "trending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      blog_category: [
        "Industry Insights",
        "Field Operations",
        "Technology Trends",
        "Growth",
      ],
      blog_label: ["latest", "popular", "trending"],
    },
  },
} as const
